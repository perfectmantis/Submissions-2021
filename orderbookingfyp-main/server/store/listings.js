const listings = [
  {
    id: 201,
    customer: "Bismillah General Store",
    orderStatus: "Ready",
    paymentStatus: "Paid",
    total: "Rs. 677",
    date: "05-07-2020"
  },
  {
    id: 201,
    customer: "Shahbaz Wholesaler",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "Rs. 1,328.35",
    date: "16-01-2020"
  },
  {
    id: 201,
    customer: "Ibrahim Store",
    orderStatus: "Ready",
    paymentStatus: "Paid",
    total: "Rs. 629.00",
    date: "04-06-2020"
  },
  {
    id: 201,
    customer: "Bismillah General Store",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "Rs. 25.90",
    date: "06-06-2020"
  },
  {
    id: 201,
    customer: "Al-Macca Traders",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
    total: "Rs. 817.50",
    date: "06-06-2020"
  },
  {
    id: 201,
    customer: "Super 36 Traders",
    orderStatus: "Ready",
    paymentStatus: "Paid",
    total: "Rs. 300.00",
    date: "16-05-2020"
  },
  {
    id: 201,
    customer: "Bismillah General Store",
    orderStatus: "Ready",
    paymentStatus: "Paid",
    total: "Rs. 677",
    date: "26-05-2020"
  },
  {
    id: 201,
    customer: "Raheel Traders",
    orderStatus: "Ready",
    paymentStatus: "Paid",
    total: "Rs. 677",
    date: "24-05-2020"
  }
];

const addListing = (listing) => {
  listing.id = listings.length + 1;
  listings.push(listing);
};

const getListings = () => listings;

const getListing = (id) => listings.find((listing) => listing.id === id);

const filterListings = (predicate) => listings.filter(predicate);

module.exports = {
  addListing,
  getListings,
  getListing,
  filterListings,
};
