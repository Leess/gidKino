var moviesFeedback = {

    buildList: function (recArray) {

        //используем данные пришедшие с сервера и отфильтровыуем их при помощи функции getFilteredList

        //проходим циклом по массиву с отфильтрованными данными
        {

            //для каждого обьекта в массиве с отфильтрованными данными создаём елемент при помощи функции createRecElement

            //добавляем созданный элемент в div на странице

            //красивенько показываем (именно этот!)

        }


    },

    getFilteredList: function (dataFromServer) {

        //создать переменную и получить туда массив с id того что уже есть на странице getExistentRecommendationIds

        //если это пустой массив - значит на странице ничего нет
        {
            //возвращаем входной массив не фильтруя
        }
        {
            //если на странице что-то уже есть

            //получаем массив id серверных данных

            //получаем id данных которые есть на среди серверных но еще нет на странице

            //если таких данных нет
            {
                //возвращаем пустой массив - поскольку нечего добавлять на страницу (там уже всё есть)

            }
            {
                // иначе готовим массив с данных на основе новых id
                // создаём переменную для хранения массива

                //для каждого нового id выполняем поиск данных в массиве пришедшем с сервера
                {
                    //ищем обьект с соотвествующим значением поля objectId

                    // если обьект найден
                    {
                        //добавляем к массиву который готовим на возврат

                    }
                }

                //возвращаем массив

            }
        }

    },

    getExistentRecommendationIds: function () {

        //создаём переменную и инициализируем пустым массивом

        //выбираем все HTML еслементы с соответствующим классом реккомендации
        {
            // и кладём в массив id выбранного елемента

        }

        //после выхода из тела цикла - возвращаем массив из функции

    },

    createRecElement: function (recObject) {

        //описать шаблон

        //создать переменную и поместить в неё результат работы функции-шаблонизатора (передать туда данные)

        //вернуть результат работы функции шаблонизатора

    }

};