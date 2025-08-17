import { Storage } from '@google-cloud/storage'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const storage = new Storage({
      projectId: config.googleCloudProjectId,
      credentials: JSON.parse(config.googleApplicationCredentialsJson)
    })

    const bucket = storage.bucket(config.googleCloudBucketName)
    
    // Set bucket to be publicly readable
    await bucket.iam.setPolicy({
      bindings: [
        {
          role: 'roles/storage.objectViewer',
          members: ['allUsers']
        }
      ]
    })

    return {
      success: true,
      message: 'Bucket permissions updated successfully'
    }
  } catch (error) {
    console.error('Setup permissions error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to setup bucket permissions'
    })
  }
})