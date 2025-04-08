// Sample data for the marketplace items with real fitness images
const itemsData = [
    {
        id: 1,
        title: "Adjustable Dumbbell Set",
        price: 120,
        location: "Toronto, ON",
        category: "equipment",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe0-iYivGoSdYBbDlxMkIRQNc9YGepXJU6Uw&s",
        seller: "LeBron James"
    },
    {
        id: 2,
        title: "Yoga Mat",
        price: 15,
        location: "North York, ON",
        category: "equipment",
        image: "https://m.media-amazon.com/images/I/71b5fW+s18L.jpg",
        seller: "Stephen Curry"
    },
    {
        id: 3,
        title: "Protein Powder (2.39lb)",
        price: 45,
        location: "London, Ontario",
        category: "supplements",
        image: "https://gorillamind.com/cdn/shop/files/GMProtein_ChocolatePeanutButterFront1028_2.png?v=1718641683",
        seller: "Ryan Gosling"
    },
    {
        id: 4,
        title: "Running Shoes (Size 10)",
        price: 65,
        location: "Markham, ON",
        category: "clothing",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        seller: "Scottie Barnes"
    },
    {
        id: 5,
        title: "Resistance Bands Set",
        price: 25,
        location: "Richmond Hill, ON",
        category: "equipment",
        image: "https://www.gymreapers.com/cdn/shop/files/black-resistancebands-new-1.jpg?v=1727994201",
        seller: "Shai Gilgeous-Alexander"
    },
    {
        id: 6,
        title: "Fitness Tracker Watch",
        price: 80,
        location: "Boston, USA",
        category: "accessories",
        image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        seller: "Giannis Antetokounmpo"
    },
    {
        id: 7,
        title: "Weightlifting Belt",
        price: 40,
        location: "Toronto, ON",
        category: "accessories",
        image: "https://www.gymstick.com/media/catalog/product/cache/0618255a1bb123b22a1271e4745709b5/6/1/61086_new.jpg",
        seller: "Anthony Edwards"
    },
    {
        id: 8,
        title: "Compression Shirt (M)",
        price: 22,
        location: "Niagara, ON",
        category: "clothing",
        image: "https://www.ump-attire.com/products/images/main/UAHG-SS-Under-Armour-HeatGear-Shirt-front.jpeg",
        seller: "Ja Morant"
    }
];

// Function to display items in the grid
function displayItems(items) {
    const itemsGrid = document.getElementById('itemsGrid');
    itemsGrid.innerHTML = '';
    
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        
        // Get first letter of seller's name for avatar
        const sellerInitial = item.seller.charAt(0).toUpperCase();
        
        itemCard.innerHTML = `
            <div class="item-image" style="background-image: url('${item.image}')"></div>
            <div class="item-info">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-price">$${item.price}</p>
                <p class="item-location">${item.location}</p>
                <p class="item-category">${capitalizeFirstLetter(item.category)}</p>
                <div class="item-seller">
                    <div class="seller-avatar">${sellerInitial}</div>
                    <span>${item.seller}</span>
                </div>
            </div>
        `;
        
        itemsGrid.appendChild(itemCard);
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to filter items by category
function filterCategory(category) {
    if (category === 'all') {
        displayItems(itemsData);
    } else {
        const filteredItems = itemsData.filter(item => item.category === category);
        displayItems(filteredItems);
    }
}

// Function to search items
function searchItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    const location = document.getElementById('locationInput').value.toLowerCase();
    
    let filteredItems = itemsData;
    
    // Filter by search term
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.seller.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by category
    if (category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === category);
    }
    
    // Filter by price range
    filteredItems = filteredItems.filter(item => 
        item.price >= minPrice && item.price <= maxPrice
    );
    
    // Filter by location
    if (location) {
        filteredItems = filteredItems.filter(item => 
            item.location.toLowerCase().includes(location)
        );
    }
    
    displayItems(filteredItems);
}

// Initialize the page with all items
window.onload = function() {
    displayItems(itemsData);
    
    // Add event listeners for category links
    document.querySelectorAll('.sidebar li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            filterCategory(category);
        });
    });
    
    // Add event listeners for price and location filters
    document.getElementById('minPrice').addEventListener('change', searchItems);
    document.getElementById('maxPrice').addEventListener('change', searchItems);
    document.getElementById('locationInput').addEventListener('input', searchItems);
};