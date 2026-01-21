-- Seed Data for Development/Testing
-- Version: 1.0.0

-- Insert test users
INSERT OR IGNORE INTO users (id, phone, name, email, loyalty_tier, loyalty_points) VALUES 
  (1, '+6281234567890', 'Ahmad Rizki', 'ahmad@example.com', 'bronze', 0),
  (2, '+6281234567891', 'Budi Santoso', 'budi@example.com', 'silver', 150),
  (3, '+6281234567892', 'Citra Dewi', 'citra@example.com', 'gold', 350);

-- Insert test barbers
INSERT OR IGNORE INTO barbers (id, phone, name, email, shop_name, shop_address, rating_average, subscription_tier, is_verified) VALUES 
  (1, '+6281987654321', 'John Barber', 'john@barbershop.com', 'Gaya Rambut Modern', 'Jl. Sudirman No. 123, Jakarta', 4.8, 'premium', 1),
  (2, '+6281987654322', 'Eko Prasetyo', 'eko@barbershop.com', 'Eko Barber House', 'Jl. Thamrin No. 45, Jakarta', 4.5, 'basic', 1);

-- Insert test services
INSERT OR IGNORE INTO services (barber_id, name, description, price, duration_minutes) VALUES 
  (1, 'Haircut Classic', 'Potongan rambut klasik dengan teknik profesional', 50000, 30),
  (1, 'Haircut + Shaving', 'Paket lengkap potong rambut dan cukur jenggot', 75000, 45),
  (1, 'Hair Coloring', 'Pewarnaan rambut dengan produk premium', 150000, 90),
  (2, 'Basic Haircut', 'Potongan rambut standar', 35000, 25),
  (2, 'Premium Styling', 'Styling rambut dengan produk berkualitas', 65000, 40);

-- Insert test bookings
INSERT OR IGNORE INTO bookings (user_id, barber_id, service_id, booking_date, booking_time, status, total_price, payment_status) VALUES 
  (1, 1, 1, '2026-01-22', '10:00', 'confirmed', 50000, 'paid'),
  (2, 1, 2, '2026-01-22', '14:00', 'confirmed', 75000, 'paid'),
  (3, 2, 4, '2026-01-23', '09:00', 'pending', 35000, 'pending');
