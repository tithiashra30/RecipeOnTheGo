import stripe

stripe.api_key = "your_secret_key"

def process_payment(amount):
    try:
        charge = stripe.Charge.create(
            amount=int(amount * 100),  # Convert to cents
            currency="usd",
            description="Grocery Store Checkout",
            source="tok_visa",  # Token from the frontend
        )
        print(f"Payment Successful! {charge['status']}")
    except stripe.error.StripeError as e:
        print(f"Payment Failed: {e.user_message}")
