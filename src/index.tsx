import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files from public/static/
app.use('/static/*', serveStatic({ root: './public' }))

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'barbershop-ecosystem'
  })
})

// API Routes
app.get('/api/hello', (c) => {
  return c.json({ 
    message: 'Welcome to Barbershop Ecosystem Hierarchial!',
    version: '1.0.0'
  })
})

// Root route - Landing page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Barbershop Ecosystem Hierarchial</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        <div class="container mx-auto px-4 py-16">
            <!-- Hero Section -->
            <div class="text-center mb-16">
                <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
                    <i class="fas fa-cut mr-4"></i>
                    Barbershop Ecosystem Hierarchial
                </h1>
                <p class="text-xl text-gray-300 mb-8">
                    Digital Transformation Platform untuk Industri Barbershop Indonesia
                </p>
                <div class="flex justify-center gap-4">
                    <span class="px-4 py-2 bg-blue-500 rounded-full text-sm">
                        <i class="fas fa-rocket mr-2"></i>MVP Phase
                    </span>
                    <span class="px-4 py-2 bg-purple-500 rounded-full text-sm">
                        <i class="fas fa-check-circle mr-2"></i>Foundation Ready
                    </span>
                </div>
            </div>

            <!-- Features Grid -->
            <div class="grid md:grid-cols-3 gap-8 mb-16">
                <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition">
                    <div class="text-4xl mb-4 text-blue-400">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Smart Booking</h3>
                    <p class="text-gray-400">Sistem booking online 24/7 dengan reminder otomatis</p>
                </div>
                
                <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition">
                    <div class="text-4xl mb-4 text-purple-400">
                        <i class="fas fa-credit-card"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Payment Gateway</h3>
                    <p class="text-gray-400">Integrasi Duitku untuk pembayaran digital</p>
                </div>
                
                <div class="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition">
                    <div class="text-4xl mb-4 text-green-400">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Loyalty Program</h3>
                    <p class="text-gray-400">Point rewards system dengan tier membership</p>
                </div>
            </div>

            <!-- Tech Stack -->
            <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 mb-8">
                <h2 class="text-2xl font-bold mb-6 text-center">
                    <i class="fas fa-code mr-2"></i>Tech Stack
                </h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div class="p-4">
                        <i class="fas fa-server text-3xl text-orange-400 mb-2"></i>
                        <p class="text-sm">Hono Framework</p>
                    </div>
                    <div class="p-4">
                        <i class="fas fa-cloud text-3xl text-blue-400 mb-2"></i>
                        <p class="text-sm">Cloudflare Pages</p>
                    </div>
                    <div class="p-4">
                        <i class="fas fa-database text-3xl text-green-400 mb-2"></i>
                        <p class="text-sm">D1 Database</p>
                    </div>
                    <div class="p-4">
                        <i class="fas fa-bolt text-3xl text-yellow-400 mb-2"></i>
                        <p class="text-sm">Edge Computing</p>
                    </div>
                </div>
            </div>

            <!-- Status -->
            <div class="text-center">
                <p class="text-gray-400 mb-4">
                    <i class="fas fa-info-circle mr-2"></i>
                    Status: <span class="text-green-400 font-bold">Checkpoint 1 Complete</span>
                </p>
                <button onclick="testAPI()" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition">
                    <i class="fas fa-vial mr-2"></i>Test API
                </button>
                <div id="api-result" class="mt-4 p-4 bg-gray-800 rounded-lg hidden"></div>
            </div>
        </div>

        <script>
        async function testAPI() {
            const resultDiv = document.getElementById('api-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Testing API...';
            
            try {
                const response = await fetch('/api/hello');
                const data = await response.json();
                resultDiv.innerHTML = \`
                    <div class="text-green-400">
                        <i class="fas fa-check-circle mr-2"></i>API Response:
                    </div>
                    <pre class="mt-2 text-left text-sm overflow-auto">\${JSON.stringify(data, null, 2)}</pre>
                \`;
            } catch (error) {
                resultDiv.innerHTML = \`
                    <div class="text-red-400">
                        <i class="fas fa-exclamation-circle mr-2"></i>Error: \${error.message}
                    </div>
                \`;
            }
        }
        </script>
    </body>
    </html>
  `)
})

export default app
