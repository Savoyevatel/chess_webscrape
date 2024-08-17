import requests
from bs4 import BeautifulSoup

def scrape_chess_openings(url, search_term):
    # Send a GET request to the webpage
    response = requests.get(url)
    
    # Create a BeautifulSoup object to parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all h3 elements with the specified class
    headings = soup.find_all('h3', class_='wp-block-heading')
    
    results = []
    
    for heading in headings:
        # Check if the search term is in the heading text
        if search_term.lower() in heading.text.lower():
            # Find the next paragraph element
            paragraph = heading.find_next('p')
            
            # Check if the paragraph starts with "1."
            if paragraph and paragraph.text.strip().startswith('1.'):
                results.append({
                    'heading': heading.text.strip(),
                    'moves': paragraph.text.strip()
                })
    
    return results

# Example usage
url = 'https://chessfox.com/chess-openings-list/'
search_term = input("Enter the opening name: ")

openings = scrape_chess_openings(url, search_term)
for opening in openings:
    print(f"Opening: {opening['heading']}")
    print(f"Moves: {opening['moves']}")
    print()