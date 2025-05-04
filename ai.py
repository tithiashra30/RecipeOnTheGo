import openai

# Set your OpenAI API key
openai.api_key = "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"

def burfi_chatbot(user_input):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use the appropriate GPT model
            messages=[
                {"role": "system", "content": "You are Burfi, a chatbot that only answers questions about recipes and cooking."},
                {"role": "user", "content": user_input}
            ]
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        return f"Error: {e}"

# Test the chatbot
if __name__ == "__main__":
    print("Burfi: Hi! I'm Burfi, your friendly chatbot. Ask me anything!")
    while True:
        user_message = input("You: ")
        if user_message.lower() in ["exit", "quit"]:
            print("Burfi: Bye! Have a sweet day!")
            break
        print(f"Burfi: {burfi_chatbot(user_message)}")