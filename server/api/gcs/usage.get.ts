import { Storage } from '@google-cloud/storage'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  try {
    const storage = new Storage({
      projectId: config.googleCloudProjectId,
      credentials: JSON.parse(config.googleApplicationCredentialsJson)
    })

    const bucket = storage.bucket(config.googleCloudBucketName)
    const [files] = await bucket.getFiles()

    let totalBytes = 0
    for (const file of files) {
      const sizeStr = file.metadata?.size
      const sizeNum = sizeStr ? parseInt(sizeStr, 10) : 0
      totalBytes += Number.isNaN(sizeNum) ? 0 : sizeNum
    }

    const quotaBytes = parseInt(config.maxGcsTotalBytes || '0', 10)
    return {
      success: true,
      data: {
        totalBytes,
        quotaBytes: Number.isNaN(quotaBytes) ? 0 : quotaBytes,
        quotaEnabled: !!(quotaBytes && quotaBytes > 0),
        percentUsed: quotaBytes && quotaBytes > 0 ? Math.min(100, Math.round((totalBytes / quotaBytes) * 100)) : null
      }
    }
  } catch (error) {
    console.error('GCS Usage Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to calculate GCS usage'
    })
  }
})

