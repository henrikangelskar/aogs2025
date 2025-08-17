import { Storage } from '@google-cloud/storage'
import archiver from 'archiver'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const body = await readBody(event)
    const { fileIds } = body
    
    if (!fileIds || !Array.isArray(fileIds) || fileIds.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No files selected for download'
      })
    }

    const storage = new Storage({
      projectId: config.googleCloudProjectId,
      credentials: JSON.parse(config.googleApplicationCredentialsJson)
    })

    const bucket = storage.bucket(config.googleCloudBucketName)
    
    // Set response headers for zip download
    setHeader(event, 'Content-Type', 'application/zip')
    setHeader(event, 'Content-Disposition', `attachment; filename="wedding-photos-${Date.now()}.zip"`)
    
    // Create zip archive
    const archive = archiver('zip', {
      zlib: { level: 9 } // Best compression
    })

    // Handle archive errors
    archive.on('error', (err) => {
      console.error('Archive error:', err)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create zip file'
      })
    })

    // Start streaming the archive
    archive.pipe(event.node.res)

    // Add each file to the archive
    for (const fileId of fileIds) {
      try {
        const file = bucket.file(fileId)
        const [exists] = await file.exists()
        
        if (exists) {
          const downloadStream = file.createReadStream()
          archive.append(downloadStream, { name: fileId })
        }
      } catch (fileError) {
        console.error(`Error adding file ${fileId} to zip:`, fileError)
        // Continue with other files even if one fails
      }
    }

    // Finalize the archive
    await archive.finalize()

  } catch (error) {
    console.error('Zip download error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create zip download'
    })
  }
})