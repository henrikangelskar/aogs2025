<template>
  <div class="min-h-screen diagonal-stripes text-black">
    <!-- Hero Section with Scrolling Images -->
    <div class="relative h-96 overflow-hidden bg-[#2501ec]">
      <!-- Gradient overlay for better text visibility -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 z-10"></div>
      
      <!-- Scrolling Images Container -->
      <div v-if="heroImages.length > 0" class="flex h-full animate-scroll">
        <div class="flex h-full">
          <div v-for="(image, index) in heroImages" :key="index" class="flex-shrink-0">
            <img 
              :src="image.url" 
              :alt="image.alt"
              class="h-full w-80 object-cover shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
        <!-- Duplicate for seamless loop -->
        <div class="flex h-full">
          <div v-for="(image, index) in heroImages" :key="`duplicate-${index}`" class="flex-shrink-0">
            <img 
              :src="image.url" 
              :alt="image.alt"
              class="h-full w-80 object-cover shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
      
      <!-- Fallback when no images -->
      <div v-else class="flex h-full items-center justify-center">
        <div class="text-center text-white">
          <div class="text-8xl mb-4">📸</div>
          <p class="text-xl">No images uploaded yet</p>
        </div>
      </div>
      
      <!-- Hero Content -->
      <div class="absolute inset-0 flex items-center justify-center z-20">
        <div class="text-center text-white">
          <h1 class="text-5xl font-bold mb-4">Bröllopsgalleri</h1>
          <p class="text-xl mb-8">Dela era minnen med alla</p>
          <button
            @click="openUploadModal"
            class="bg-white text-[#2501ec] px-8 py-3 font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg rounded-lg"
          >
            📸 Ladda upp foton
          </button>
        </div>
      </div>
    </div>

    <!-- Gallery Grid Section -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-black mb-8 text-center">Minnen från firandet</h2>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
          <p class="mt-4 text-gray-700">Laddar bilder...</p>
          <div class="mt-4 flex justify-center">
            <div class="inline-flex items-center space-x-2">
              <svg class="animate-spin h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-sm text-gray-600 opacity-80">Hämtar minnen från bröllopet...</span>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="galleryImages.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">💒</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Inga bilder ännu</h3>
          <p class="text-gray-600 mb-6">Bli den första att ladda upp foton från bröllopet!</p>
          <button
            @click="openUploadModal"
            class="bg-[#2501ec] text-white px-6 py-3 font-medium hover:bg-[#1e01b8] transition-colors rounded-lg"
          >
            Ladda upp första fotot
          </button>
        </div>
        
        <!-- Dynamic Grid Layout -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[200px]">
            <div 
              v-for="(image, index) in galleryImages" 
              :key="image.id"
              class="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg cursor-pointer"
              :class="getGridClass(index)"
              @click="openImageViewer(index)"
            >
              <img 
                :src="image.url" 
                :alt="image.alt"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="font-semibold">{{ image.title }}</p>
                  <p class="text-sm opacity-90">{{ image.date }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Load More Button -->
          <div v-if="hasMoreImages" class="text-center mt-8">
            <button
              @click="loadMoreImages"
              class="bg-[#2501ec] text-white px-8 py-3 font-medium hover:bg-[#1e01b8] transition-colors rounded-lg"
            >
              Ladda fler bilder
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Viewer Modal -->
    <div 
      v-if="showImageViewer" 
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click="closeImageViewer"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm"></div>
      
            <!-- Modal Content -->
      <div 
        class="relative bg-white p-6 rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col"
        @click.stop
      >
        <!-- Image Container -->
        <div class="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
          <img 
            :src="currentImage.url" 
            :alt="currentImage.alt"
            class="max-w-full max-h-full object-contain"
            style="max-height: calc(90vh - 120px);"
          />
        </div>
        
        <!-- Close Button -->
        <button
          @click="closeImageViewer"
          class="absolute top-4 right-4 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full hover:bg-opacity-100 transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Delete Button -->
        <button
          @click="confirmDelete"
          class="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
        
        <!-- Navigation and Counter -->
        <div class="flex items-center justify-center space-x-4 mt-4">
          <!-- Previous Button -->
          <button
            @click="previousImage"
            class="bg-gray-200 text-gray-800 p-3 rounded-full hover:bg-gray-300 transition-all"
            v-if="galleryImages.length > 1"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <!-- Image Counter -->
          <div class="bg-gray-100 px-4 py-2 rounded-lg">
            <p class="text-sm text-gray-600 font-medium">{{ currentImageIndex + 1 }} of {{ galleryImages.length }}</p>
          </div>
          
          <!-- Next Button -->
          <button
            @click="nextImage"
            class="bg-gray-200 text-gray-800 p-3 rounded-full hover:bg-gray-300 transition-all"
            v-if="galleryImages.length > 1"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      </div>
    </div>

          <!-- Delete Confirmation Modal -->
      <div 
        v-if="showDeleteConfirm" 
        class="fixed inset-0 z-[70] flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white p-6 rounded-lg shadow-2xl max-w-md w-full mx-4">
          <!-- Delete Confirmation -->
          <div v-if="!deleteCompleted">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Radera bild</h3>
            <p class="text-gray-600 mb-6">Är du säker på att du vill radera denna bild? Denna åtgärd kommer att permanent ta bort den för alla.</p>
            
            <div class="flex space-x-4">
              <button
                @click="deleteImage"
                class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                :disabled="deleting"
              >
                <span v-if="deleting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Raderar...
                </span>
                <span v-else>Radera</span>
              </button>
              <button
                @click="cancelDelete"
                class="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                :disabled="deleting"
              >
                Avbryt
              </button>
            </div>
          </div>
          
          <!-- Delete Success -->
          <div v-else class="text-center">
            <h3 class="text-xl font-bold text-gray-800 mb-2">Bild raderad framgångsrikt!</h3>
            <p class="text-gray-600 mb-6">Bilden har permanent tagits bort från galleriet.</p>
            <button
              @click="closeDeleteSuccess"
              class="bg-[#2501ec] text-white py-2 px-6 rounded-lg hover:bg-[#1e01b8] transition-colors"
            >
              Stäng
            </button>
          </div>
        </div>
      </div>





    <!-- Upload Modal -->
    <div 
      v-if="showUploadModal" 
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click="closeUploadModal"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      <!-- Modal Content -->
      <div 
        class="relative bg-white shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto rounded-lg"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-2xl font-bold text-gray-800">Ladda upp era foton</h3>
          <button 
            @click="closeUploadModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

                <!-- Modal Body -->
        <div class="p-6">
          <!-- Upload Progress Only (when uploading) -->
          <div v-if="uploading" class="text-center py-8">
            <div class="text-6xl mb-4">📸</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Laddar upp era minnen...</h3>
            <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                class="bg-[#2501ec] h-3 rounded-full transition-all duration-300"
                :style="{ width: uploadProgress + '%' }"
              ></div>
            </div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Framsteg</span>
              <span class="text-sm text-gray-500">{{ Math.round(uploadProgress) }}%</span>
            </div>
            <div class="mt-4">
              <div class="inline-flex items-center space-x-2">
                <svg class="animate-spin h-4 w-4 text-[#2501ec]" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm text-gray-600">Komprimerar och laddar upp bilder...</span>
              </div>
            </div>
          </div>

          <!-- Upload Success (when completed) -->
          <div v-else-if="uploadCompleted" class="text-center py-8">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">Bilder uppladdade framgångsrikt!</h3>
            <p class="text-gray-600 mb-6">Era minnen från bröllopet har sparats i galleriet.</p>
            <button
              @click="closeUploadModal"
              class="bg-[#2501ec] text-white py-2 px-6 rounded-lg hover:bg-[#1e01b8] transition-colors"
            >
              Stäng
            </button>
          </div>

          <!-- Normal Upload Interface (when not uploading) -->
          <div v-else>
            <!-- File Upload Area -->
            <div 
              @drop.prevent="handleDrop"
              @dragover.prevent
              @dragenter.prevent
              class="border-2 border-dashed border-white p-8 text-center hover:border-gray-300 transition-colors cursor-pointer"
              :class="{ 'border-gray-300 bg-white bg-opacity-10': isDragOver }"
              @click="$refs.fileInput.click()"
            >
              <div class="space-y-4">
                <div class="text-6xl text-gray-400">
                  📸
                </div>
                <div>
                  <p class="text-lg font-medium text-gray-700">
                    Släpp era bilder här eller klicka för att bläddra
                  </p>
                  <p class="text-sm text-gray-500 mt-2">
                    Stöder JPG, PNG, GIF upp till 10MB
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    Bilder komprimeras automatiskt för optimal kvalitet
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    Max 20 bilder åt gången
                  </p>
                </div>
              </div>
            </div>

            <!-- Hidden file input -->
            <input
              ref="fileInput"
              type="file"
              multiple
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />

            <!-- Upload Button -->
            <div v-if="selectedFiles.length > 0" class="mt-6">
              <button
                @click="uploadImages"
                class="w-full bg-[#2501ec] text-white py-3 px-6 font-medium hover:bg-[#1e01b8] transition-colors rounded-lg"
                :disabled="uploading"
              >
                Ladda upp {{ selectedFiles.length }} bild{{ selectedFiles.length > 1 ? 'er' : '' }}
              </button>
            </div>

            <!-- Shared Message Input -->
            <div v-if="selectedFiles.length > 0" class="mt-6">
              <h3 class="text-lg font-medium text-gray-800 mb-4">Lägg till ett roligt meddelande</h3>
              <textarea
                v-model="sharedMessage"
                placeholder="Skriv ett roligt meddelande om dessa minnen från bröllopet..."
                class="w-full p-3 border border-gray-300 text-sm resize-none"
                rows="4"
                maxlength="200"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">{{ sharedMessage.length }}/200 tecken</p>
            </div>

            <!-- Selected Files Preview -->
            <div v-if="selectedFiles.length > 0" class="mt-6">
              <h3 class="text-lg font-medium text-gray-800 mb-4">Valda filer:</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div 
                  v-for="(file, index) in selectedFiles" 
                  :key="index"
                  class="relative group"
                >
                  <img 
                    :src="getFilePreview(file)" 
                    :alt="file.name"
                    class="w-full h-32 object-cover"
                  />
                  <button
                    @click="removeFile(index)"
                    class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                  <p class="text-xs text-gray-600 mt-1 truncate">{{ file.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { $supabase } = useNuxtApp()
const supabase = $supabase

// Modal state
const showUploadModal = ref(false)
const showImageViewer = ref(false)
const showDeleteConfirm = ref(false)
const isDragOver = ref(false)
const deleting = ref(false)
const deleteCompleted = ref(false)

// Image viewer state
const currentImageIndex = ref(0)
const currentImage = computed(() => galleryImages.value[currentImageIndex.value] || {})

// Upload state
const selectedFiles = ref([])
const sharedMessage = ref('')
const uploading = ref(false)
const uploadCompleted = ref(false)
const uploadProgress = ref(0)

// File input ref
const fileInput = ref(null)

// Real uploaded images
const heroImages = ref([])
const galleryImages = ref([])
const allImages = ref([])
const loading = ref(true)
const currentPage = ref(1)
const imagesPerPage = 50
const hasMoreImages = ref(true)

// Fetch images from Supabase
const fetchImages = async (page = 1, append = false) => {
  try {
    if (page === 1) {
      loading.value = true
    }
    
    // Calculate offset for pagination
    const offset = (page - 1) * imagesPerPage
    
    // Fetch images with pagination
    const { data: images, error } = await supabase
      .from('user_images')
      .select('*')
      .order('uploaded_at', { ascending: false })
      .range(offset, offset + imagesPerPage - 1)

    if (error) {
      console.error('Error fetching images:', error)
      return
    }

    // Transform the data to include public URLs and format for display
    const transformedImages = images.map((image, index) => {
      const publicUrl = supabase.storage
        .from('user-images')
        .getPublicUrl(image.file_path).data.publicUrl

      return {
        id: image.id,
        url: publicUrl,
        alt: image.file_name,
        title: image.message || '', // Use message or empty string
        date: new Date(image.uploaded_at).toLocaleDateString(),
        size: getRandomSize(), // Random size for dynamic layout
        originalData: image
      }
    })

    if (page === 1) {
      // First page - set hero images and gallery images
      heroImages.value = transformedImages.slice(0, 6)
      galleryImages.value = transformedImages
      allImages.value = transformedImages
    } else {
      // Append to existing images
      galleryImages.value = [...galleryImages.value, ...transformedImages]
      allImages.value = [...allImages.value, ...transformedImages]
    }

    // Check if there are more images to load
    hasMoreImages.value = transformedImages.length === imagesPerPage
    currentPage.value = page

  } catch (error) {
    console.error('Error fetching images:', error)
  } finally {
    loading.value = false
  }
}

// Get random size for dynamic layout
const getRandomSize = () => {
  const sizes = ['normal', 'normal', 'normal', 'large', 'tall', 'wide']
  return sizes[Math.floor(Math.random() * sizes.length)]
}

// Load more images function
const loadMoreImages = async () => {
  await fetchImages(currentPage.value + 1)
}

// Load images on component mount
onMounted(() => {
  fetchImages()
})

// Get grid class based on image size and index
const getGridClass = (index) => {
  const image = galleryImages.value[index]
  if (!image) return ''
  
  switch (image.size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2'
    case 'tall':
      return 'md:row-span-2'
    case 'wide':
      return 'md:col-span-2'
    default:
      return ''
  }
}

// Modal functions
const openUploadModal = () => {
  showUploadModal.value = true
}

const closeUploadModal = () => {
  showUploadModal.value = false
  selectedFiles.value = []
  sharedMessage.value = ''
  uploadProgress.value = 0
  uploading.value = false
  uploadCompleted.value = false
}

// Image viewer functions
const openImageViewer = (index) => {
  currentImageIndex.value = index
  showImageViewer.value = true
}

const closeImageViewer = () => {
  showImageViewer.value = false
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % galleryImages.value.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? galleryImages.value.length - 1 
    : currentImageIndex.value - 1
}

// Delete functions
const confirmDelete = () => {
  showImageViewer.value = false
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
  showImageViewer.value = true
}

const deleteImage = async () => {
  try {
    deleting.value = true
    const imageToDelete = currentImage.value
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('user-images')
      .remove([imageToDelete.originalData.file_path])
    
    if (storageError) {
      console.error('Storage delete error:', storageError)
    }
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('user_images')
      .delete()
      .eq('id', imageToDelete.id)
    
    if (dbError) {
      console.error('Database delete error:', dbError)
    }
    
    // Set delete completed state
    deleteCompleted.value = true
    
    // Refresh gallery
    await fetchImages()
    
  } catch (error) {
    console.error('Delete failed:', error)
    alert('Misslyckades att radera bild. Försök igen.')
  } finally {
    deleting.value = false
  }
}

const closeDeleteSuccess = () => {
  showDeleteConfirm.value = false
  deleteCompleted.value = false
  showImageViewer.value = false
}



// Handle file selection
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  addFiles(files)
}

// Handle drag and drop
const handleDrop = (event) => {
  isDragOver.value = false
  const files = Array.from(event.dataTransfer.files)
  addFiles(files)
}

// Add files to selection
const addFiles = (files) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  // Limit to 20 images
  const remainingSlots = 20 - selectedFiles.value.length
  const filesToAdd = imageFiles.slice(0, remainingSlots)
  
  if (filesToAdd.length < imageFiles.length) {
    alert(`Du kan bara ladda upp 20 bilder åt gången. ${imageFiles.length - filesToAdd.length} bilder har ignorerats.`)
  }
  
  selectedFiles.value.push(...filesToAdd)
}

// Compress image to reasonable size
const compressImage = (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions (max 1920px width/height)
      const maxSize = 1920
      let { width, height } = img
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
      }
      
      // Set canvas dimensions
      canvas.width = width
      canvas.height = height
      
      // Draw resized image
      ctx.drawImage(img, 0, 0, width, height)
      
      // Convert to blob with quality 0.85
      canvas.toBlob((blob) => {
        // Create new file with compressed data
        const compressedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now()
        })
        resolve(compressedFile)
      }, file.type, 0.85)
    }
    
    img.src = URL.createObjectURL(file)
  })
}

// Remove file from selection
const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

// Get file preview URL
const getFilePreview = (file) => {
  return URL.createObjectURL(file)
}

// Upload images to Supabase
const uploadImages = async () => {
  if (selectedFiles.value.length === 0) return

  uploading.value = true
  uploadProgress.value = 0

  try {
    for (let i = 0; i < selectedFiles.value.length; i++) {
      const file = selectedFiles.value[i]
      
      // Compress image before upload
      const compressedFile = await compressImage(file)
      
      // Generate unique filename
      const fileExt = compressedFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, compressedFile)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        continue
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-images')
        .getPublicUrl(filePath)

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('user_images')
        .insert({
          user_id: null, // Allow anonymous uploads
          file_name: compressedFile.name,
          file_path: filePath,
          file_size: compressedFile.size,
          mime_type: compressedFile.type,
          description: '',
          tags: [],
          message: sharedMessage.value || ''
        })

      if (dbError) {
        console.error('Database error:', dbError)
      }

      // Update progress
      uploadProgress.value = ((i + 1) / selectedFiles.value.length) * 100
    }

    // Clear selection after successful upload
    selectedFiles.value = []
    uploadProgress.value = 0
    uploading.value = false
    uploadCompleted.value = true
    
    // Refresh the gallery with new images
    await fetchImages()

  } catch (error) {
    console.error('Upload failed:', error)
    alert('Uppladdning misslyckades. Försök igen.')
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 40s linear infinite;
  width: max-content;
}

/* Pause animation on hover */
.animate-scroll:hover {
  animation-play-state: paused;
}

/* Ensure images don't overlap */
.animate-scroll > div {
  display: flex;
}

/* Wedding gradient background */
.diagonal-stripes {
  background: #ffffff;
}
</style> 