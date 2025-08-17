import { Storage } from '@google-cloud/storage'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 50
    const mediaType = query.mediaType as string || 'all' // 'images', 'videos', or 'all'
    
    const storage = new Storage({
      projectId: config.googleCloudProjectId,
      credentials: JSON.parse(config.googleApplicationCredentialsJson)
    })

    const bucket = storage.bucket(config.googleCloudBucketName)
    
    // List all files in the bucket
    const [files] = await bucket.getFiles({
      maxResults: limit * page * 3, // Get more to account for filtering
    })

    // Transform files to the format expected by the gallery
    const mediaFiles = files
      .filter(file => {
        const mimeType = file.metadata?.contentType || ''
        
        if (mediaType === 'images') {
          return mimeType.startsWith('image/')
        } else if (mediaType === 'videos') {
          return mimeType.startsWith('video/')
        } else {
          return mimeType.startsWith('image/') || mimeType.startsWith('video/')
        }
      })
      .map(file => {
        // Extract timestamp from filename if it exists (TIMESTAMP-randomstring.ext)
        const timestamp = file.name.split('-')[0]
        const uploadDate = timestamp && !isNaN(parseInt(timestamp)) 
          ? new Date(parseInt(timestamp))
          : new Date(file.metadata?.timeCreated || Date.now())
        
        return {
          id: file.name, // Use filename as ID
          url: `https://storage.googleapis.com/${config.googleCloudBucketName}/${file.name}`,
          alt: file.name,
          title: '', // No message support for now, could be added via metadata
          date: uploadDate.toLocaleDateString(),
          fileName: file.name,
          size: file.metadata?.size || 0,
          mimeType: file.metadata?.contentType || 'image/jpeg',
          uploadedAt: uploadDate.toISOString()
        }
      })
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()) // Sort by upload date desc

    // Implement pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedMedia = mediaFiles.slice(startIndex, endIndex)
    
    return {
      success: true,
      data: {
        images: paginatedMedia,
        totalCount: mediaFiles.length,
        hasMore: endIndex < mediaFiles.length,
        page,
        limit
      }
    }
  } catch (error) {
    console.error('GCS List Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to list files from Google Cloud Storage'
    })
  }
})