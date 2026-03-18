import os

file_path = r'c:\Users\moksh\OneDrive\Desktop\chatichates\frontend\lint_output.txt'
if os.path.exists(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()
    try:
        # Try to decode as utf-16le
        text = content.decode('utf-16le')
        print(text)
    except:
        print(content.decode('utf-8', errors='ignore'))
else:
    print("File not found")
