from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bs4 import BeautifulSoup
import requests
from base.serializers import DefenseSerializer, ResultSerializer
from base.products import products
from base.models import Defense, Result
import zlib
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes



# def decompress_stream(stream):
#     o = zlib.decompressobj(16 + zlib.MAX_WBITS)

#     for chunk in stream:
#         yield o.decompress(chunk)

#     yield o.flush()

@api_view(['POST'])
def scrape_defense(request):
    defense_name = request.data.get('name')
    if not defense_name:
        return Response({'error': 'No defense name provided'}, status=400)

    # Save the defense name to the database
    serializer = DefenseSerializer(data={'name': defense_name})
    if serializer.is_valid():
        serializer.save()
    else:
        print("Defense serializer error:", serializer.errors)

    # Scrape the chess openings
    url = 'https://chessfox.com/chess-openings-list/'
    openings = scrape_chess_openings(url, defense_name)

    # Debug print statements
    print(f"Defense Name: {defense_name}")
    print(f"Scraped Openings: {openings}")

    return Response({'results': openings})

def scrape_chess_openings(url, search_term):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }

        # Send a GET request to the webpage with the specified headers
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes

        # Debug print statements
        print(f"HTTP GET request to {url} completed with status code {response.status_code}")

        # Create a BeautifulSoup object to parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all h3 elements with the specified class
        headings = soup.find_all('h3', class_='wp-block-heading')

        # Debug print statement
        print(f"Found {len(headings)} headings")

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

        # Debug print statement
        print(f"Scrape results: {results}")

        return results

    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return []

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_result(request):
    user = request.user  # Get the authenticated user
    data = request.data

    # Create a copy of the data and add the user field
    data['user'] = user.id

    serializer = ResultSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_saved_results(request):
    user = request.user
    results = Result.objects.filter(user=user)
    serializer = ResultSerializer(results, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_opening(request, pk):
    try:
        opening = Result.objects.get(id=pk, user=request.user)
        opening.delete()
        return Response({'message': 'Opening deleted successfully'}, status=204)
    except Result.DoesNotExist:
        return Response({'error': 'Opening not found or not authorized'}, status=404)