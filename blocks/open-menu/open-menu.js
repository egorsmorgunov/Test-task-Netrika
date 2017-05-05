/**
 * Открывает меню:
 * 1.вставляем узлы
 * 2.блокируем и скрываем кнопку
 * @param
 * @return {void}
 */
function OpenMenu() {
	
	//Проверяем существование (если нету - создаём)
	var CloseMenu = document.querySelector('.elems');
	var MenuHeader = document.querySelector('.menu-header');
	if (CloseMenu == null){
		
		MenuHeader.insertAdjacentHTML("afterEnd", 
			"<div class='elems'><div class='list-elems'><input class='button list-elems__button' type='button' value='Close menu'  onclick='CloseMenu()'></div></div><div class='items'><div class='list-items'><input class='button list-items__button' type='button' value='Add item'  onclick='AddItem(1)'></div></div>");
	}
	else { //если есть - показываем
		//var CloseMenu = document.querySelector('.elems');
		document.querySelector('.elems').classList.remove('elems_hide');
		document.querySelector('.items').classList.remove('items_hide');
	}
	//Скрываем кнопку в любом случае (по заданию не сказано, но на втором и последующих слайдах её нет)
	document.querySelector('.open-menu__button').setAttribute('disabled', 'disabled');//блокируем кнопку
	MenuHeader.querySelector('.open-menu').classList.add('open-menu_hide');//скрываем
}
/**
 * Скрывает (не удаляет меню) и  показывает open-menu
 * @param
 * @return {void}
 */
function CloseMenu() {
	//показываем open-menu
	document.querySelector('.open-menu__button').removeAttribute('disabled');//разблокируем кнопку
	//тупой js не даёт называть переменную как OpenMenu - ошибка object is not a function :( убил час на это
	document.querySelector('.open-menu').classList.remove('open-menu_hide');
	//скрываем elems & items
	document.querySelector('.elems').classList.add('elems_hide');
	document.querySelector('.items').classList.add('items_hide');
}
/**
 * Добавляет Item, динамически генерируя № пункта.
 * Добавляет Elem
 * @param int i текущий номер пункта
 * @return {void}
 */
function AddItem(i) {
	//var i = makeCounter();
	//var ii=i.getNext();
	var ListItems = document.querySelector('.list-items__button');
	ListItems.insertAdjacentHTML("beforeBegin", 
		"<div class='list-items__item item"+i+"'><div class='item__label'>Item #"+i+"</div><textarea class='item__textarea' rows='4' cols='17' onKeyUp='EditTextarea("+i+")'></textarea><input class='button item__remove-button' type='button' value='Remove' onclick='Remove(this)'></div>");
	
	//Добавляем элемент
	var ListElems = document.querySelector('.list-elems');
	ListElems.insertAdjacentHTML("beforeEnd", 
		"<div class='list-elems__elem elem"+i+"'></div>");
	//многое перепробовал что в интернете советуют - не пашет, но решил сам
	i++; // забыл как прибавлять прямо в параметре функции
	document.querySelector('.list-items__button').setAttribute('onclick', 'AddItem('+i+')');
}
/**
 * Изменяет содержимое элемента при изменении в его текстовом поле
 * @param int i № элемента соот. текстовой области
 * @return {void}
 */
function EditTextarea(i) {
	//TO DO: переписать на захват нового символа, а не на копирование всего текста каждый раз
	document.querySelector('.elem'+i+'').textContent = document.querySelector('.item'+i+'').querySelector('.item__textarea').value;
}
/**
 * Скрывает, но не удаляет Item, меняет кнопку на Restore
 * @param obj Button указатель кнопки Remove
 * @return {void}
 */
function Remove(Button) {
	Button.setAttribute('onclick', 'Restore(this)');
	Button.setAttribute('value', 'Restore');
	Button.parentElement.querySelector('.item__label').classList.add('item__label_hide');
	Button.parentElement.querySelector('.item__textarea').classList.add('item__textarea_hide');
}
/**
 * Показывает Item, меняет кнопку на Remove
 * @param obj  указатель кнопки Restore
 * @return {void}
 */
function Restore(Button) {
	Button.setAttribute('onclick', 'Remove(this)');
	Button.setAttribute('value', 'Remove');
	Button.parentElement.querySelector('.item__label').classList.remove('item__label_hide');
	Button.parentElement.querySelector('.item__textarea').classList.remove('item__textarea_hide');
}
