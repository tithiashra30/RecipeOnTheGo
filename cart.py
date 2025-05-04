import cv2
import sqlite3

# Initialize webcam for QR code scanning
cap = cv2.VideoCapture(0)

# Connect to the database to retrieve product info
conn = sqlite3.connect('grocery_store.db')
cursor = conn.cursor()

# Initialize the shopping cart
cart = []

# Function to retrieve product details by QR code data
def get_product_info(qr_data):
    cursor.execute("SELECT * FROM products WHERE name LIKE ?", ('%' + qr_data + '%',))
    product = cursor.fetchone()
    if product:
        return product[1], product[2]  # Name and Price
    return None, None

print("Scan QR codes of products to add to cart.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detect QR codes
    detector = cv2.QRCodeDetector()
    data, bbox, _ = detector.detectAndDecode(frame)

    if data:
        print(f"QR Code Data: {data}")
        name, price = get_product_info(data)

        if name:
            print(f"Product: {name}, Price: ${price}")
            cart.append((name, price))  # Add product to cart

        # Show current cart
        print("Current Cart:", cart)

    # Show video feed
    cv2.imshow("QR Code Scanner", frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Calculate the total price
total_price = sum(item[1] for item in cart)
print(f"Total Price: ${total_price:.2f}")

cap.release()
cv2.destroyAllWindows()
conn.close()
