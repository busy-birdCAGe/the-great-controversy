import requests
from bs4 import BeautifulSoup
import json

response = requests.get("https://m.egwwritings.org/en/book/132.2/toc")

soup = BeautifulSoup(response.text, 'html.parser')

parent_element = soup.find(class_="toc")

book = []

if parent_element:
    child_link_elements = parent_element.find_all('a', href=True)

for child_link_element in child_link_elements:

    response = requests.get("https://m.egwwritings.org/" + child_link_element.attrs["href"])

    soup = BeautifulSoup(response.text, 'html.parser')

    parent_element = soup.find(class_="egw_content_container")

    if parent_element:
        child_elements = parent_element.find_all()

    chapter_paragraphs = []

    for child_element in child_elements:
        if paragraph_number := child_element.attrs.get("data-refcode"):
            if paragraph_number.startswith("GC"):
                chapter_paragraphs.append({
                    "paragraph": paragraph_number,
                    "content": child_element.text
                })

    book.append({
        "section": chapter_paragraphs[0]["content"],
        "paragraphs": chapter_paragraphs
    })

with open(f"book.json", "w") as f:
    f.write(json.dumps(book, indent=4).replace("\\u201c", "''").replace("\\u201d", "''").replace("\\u2014", "-").replace("\\n", "").replace("\\u2019", "'"))