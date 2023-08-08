def extract_text_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            text = file.read()
        return text
    except FileNotFoundError:
        return "File not found."
    except Exception as e:
        return f"An error occurred: {e}"

# Provide the path to the file you want to extract text from
file_path = 'path/to/your/file.txt'
extracted_text = extract_text_from_file(file_path)

print("Extracted Text:")
print(extracted_text)