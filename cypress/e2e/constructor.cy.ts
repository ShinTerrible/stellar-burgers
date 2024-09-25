describe('ingredients are added to constructor correctly', () => {
  beforeEach(() => {
    //настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'createOrderBurger'
    );
    cy.visit('http://localhost:4000/');
    cy.viewport(1300, 800);
  });

  // // тест на добавление булки
  it('should add bun to constructor', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка')
      .should('exist');
  });

  // // тест на добавление начинки
  it('should add main to constructor', () => {
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус с шипами')
      .should('exist');
  });
});

// Протестирована работа модальных окон:
describe('open/close modal works correctly', () => {
  beforeEach(() => {
    //настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
    cy.viewport(1300, 800);
  });

  // открытие модального окна ингредиента;
  it('open modal works correctly', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Биокотлета').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Биокотлета').should('exist');
  });

  // закрытие по клику на крестик;
  it('close modal works correctly', () => {
    cy.contains('Биокотлета').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });

  // закрытие по клику на оверлей (желательно);
  it('close modal by overlay works correctly', () => {
    cy.contains('Биокотлета').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

// Создание заказа:
describe('order modal works correctly', () => {
  beforeEach(() => {
    //настройка перехвата запросов во всех тестах
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    // // Подставляются моковые токены авторизации.
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    // Созданы моковые данные ответа на запрос данных пользователя.
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-refreshToken');

    cy.visit('http://localhost:4000/');
    cy.viewport(1300, 800);
  });

  afterEach(() => {
    //очищает хранилище и куки после завершения тестов
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  //Отображается имя пользователя
  it('should display the correct user data', () => {
    cy.get('[data-cy=user-name]').contains('Boris Britva').should('exist');
  });

  // Собирается бургер.
  it('burger should be made up', () => {
    //проверяем, пустой ли конструктор изначально
    cy.get('[data-cy=constructor-ingredients]').contains('Выберите булки');
    cy.get('[data-cy=constructor-ingredients]').contains('Выберите начинку');

    // Собирается бургер
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Краторная булка')
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains('Краторная булка')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус с шипами')
      .should('exist');

    // Вызывается клик по кнопке «Оформить заказ».
    cy.get('[data-cy=order-summ] button').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', { ingredients: ['2', '3', '1'] });

    // Проверяется, что модальное окно открылось и номер заказа верный.
    cy.get('[data-cy=modal]').contains('12345').should('exist');

    // Закрывается модальное окно и проверяется успешность закрытия.
    cy.get('[data-cy=close-modal-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.reload();

    // Проверяется, что конструктор пуст.
    cy.get('[data-cy=constructor-ingredients]').contains('Выберите булки');
    cy.get('[data-cy=constructor-ingredients]').contains('Выберите начинку');
  });
});
