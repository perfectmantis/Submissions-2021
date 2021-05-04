const List = {
  list: [
    // {
    //   id: 0,
    //   title: "Trang chủ",
    //   url: "dashboard",
    //   icons: "ft-home",
    // },
    
    {
      id: 1,
      title: 'User',
      url: 'user',
      icons: 'ft-users',
      name: 'Admin',
    },
    {
      id: 2,
      title: 'Inventory',
      url: 'product',
      icons: 'ft-box',
      name: 'Inventory',
    },
    {
      id: 3,
      title: 'Barcode',
      url: 'barcode',
      icons: 'fa fa-barcode',
      name: 'Barcode',
    },
    {
      id: 4,
      title: 'Customers',
      url: 'customer',
      icons: 'fa fa-user',
      name: 'Customers',
    },
    {
      id: 5,
      title: 'Rent Product',
      url: 'rentproduct',
      icons: 'icon-basket-loaded',
      name: 'Rentproduct',
    },
    {
      id: 6,
      title: 'Orders',
      url: 'orders',
      icons: 'icon-bag',
      name: 'Orders',
    },
    {
      id: 7,
      title: 'Appointments',
      url: 'appointments',
      icons: 'ft-activity',
      name: 'Appointments',
    },
    {
      id: 8,
      title: 'Return Product',
      url: 'returnproduct',
      icons: 'ft-activity',
      name: 'Returnproduct',
    },
    {
      id: 9,
      title: 'Calender',
      url: 'calender',
      icons: 'ft-calendar',
      name: 'Calender',
    },
   
  ],
  getList: function (user) {
    if (user && user.systemRole === 'Admin') {
      return (
        (localStorage.getItem(user._id) &&
          JSON.parse(localStorage.getItem(user._id))) ||
        this.list
      );
    } else if (user && user.systemRole === 'Employee') {
      const user_list = user && user.sections;
      const my_menu = [];
      for (let k = 0; k < this.list.length; k++) {
        if (user_list && user_list.includes(this.list[k].name)) {
          my_menu.push(this.list[k]);
        }
      }
      return (
        (localStorage.getItem(user._id) &&
          JSON.parse(localStorage.getItem(user._id))) ||
        my_menu
      );
    }
  },
  saveList: (list, user) => {
    if (!localStorage.getItem(user._id)) {
      const token = localStorage.getItem('token');
      localStorage.clear();
      localStorage.setItem('token', token);
      localStorage.setItem(user._id, JSON.stringify(list));
    }
    localStorage.setItem(user._id, JSON.stringify(list));
  },
};

export default List;
