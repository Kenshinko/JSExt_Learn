const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const $goodsList = document.querySelector('.goods__list');
  
const renderGoodsItem = ({title, price}) => {
    return `<li class='goods__item'><img class='goods__img' src='https://source.unsplash.com/random/240x320?sig=${Math.trunc(Math.random() * 100)}' alt='Изображение${Math.trunc(Math.random() * 100)}'><ul class='goods__decs'><h3 class='goods__name'>${title}</h3><p class='goods__price'>${price}</p></ul></li>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            (item) =>  {
                return renderGoodsItem(item)
            }
        ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();


