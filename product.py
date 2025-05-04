import sqlite3
import qrcode

# Connect to the database (or create it)
conn = sqlite3.connect('grocery_store.db')
cursor = conn.cursor()

# Create a table to store product details
cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT,
        qr_code TEXT
    )
''')

# Function to generate QR code for product
def create_qr_code(product_id):
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    product = cursor.fetchone()
    if product:
        qr_data = f"Product: {product[1]}\nPrice: ${product[2]}\nDescription: {product[3]}"
        qr = qrcode.make(qr_data)
        qr_code_path = f"qr_codes/{product[0]}.png"
        qr.save(qr_code_path)
        return qr_code_path
    return None

# Add a new product
def add_product(name, price, description):
    cursor.execute("INSERT INTO products (name, price, description) VALUES (?, ?, ?)", (name, price, description))
    conn.commit()
    product_id = cursor.lastrowid
    qr_code_path = create_qr_code(product_id)
    return product_id, qr_code_path

# Example: Adding a new product
product_id, qr_code_path = add_product('Apple', 0.99, 'Fresh red apple')
print(f"Product added with QR code saved to {qr_code_path}")

conn.close()
