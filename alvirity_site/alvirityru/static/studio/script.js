//после загрузки веб-страницы
$(function () {

  console.log("Загрузилось");


  // при отправке формы messageForm на сервер (id="messageForm")
  $("#messageForm").submit(function (event) {
    // отменим стандартное действие браузера
    event.preventDefault();

    console.log("Нажал");

    checkbox = document.getElementById('checkbox');
    uname = document.getElementById('userName');
    uphone = document.getElementById('userPhone');
    uemail = document.getElementById('userMail');
    //umessage = document.getElementById('message');
    var response = grecaptcha.getResponse();

    // заведём переменную, которая будет говорить о том валидная форма или нет
    var formValid = true;

    // перебирём все элементы управления формы (input и textarea)
    $('#messageForm input,#messageForm textarea').each(function () {

      //найти предков, имеющих класс .form-group (для установления success/error)
      var formGroup = $(this).parents('.form-group');
      //найти glyphicon (иконка успеха или ошибки)
      var glyphicon = formGroup.find('.form-control-feedback');
      //валидация данных с помощью HTML5 функции checkValidity
      if (this.checkValidity()) {
        //добавить к formGroup класс .has-success и удалить .has-error
        formGroup.addClass('has-success').removeClass('has-error');
      } else {
        //добавить к formGroup класс .has-error и удалить .has-success
        formGroup.addClass('has-error').removeClass('has-success');
        //если элемент не прошёл проверку, то отметить форму как не валидную
        formValid = false;
      }
    });

    //проверяем элемент, содержащий код капчи
    //1. Получаем капчу
    var captcha = grecaptcha.getResponse();
    //2. Если длина кода капчи, которой ввёл пользователь не равно 6,
    //   то сразу отмечаем капчу как невалидную (без отправки на сервер)
    if (!captcha.length) {
      // Выводим сообщение об ошибке
      $('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
    } else {
      // получаем элемент, содержащий капчу
      $('#recaptchaError').text('');
    }

    //var thestring = "";
    //thestring += umessage["value"];

    if(!checkbox.checked) {
		  alert("Как с вами связываться без согласия на обработку персональных данных?");
    }
    else if(!response) {
      alert("Как с вами связываться, точно не узнав, робот ли вы?");
    }
    //else if(thestring.length>0 && thestring.length<5) {
    //  alert("Сообщение слишком короткое.");
    //}
    //else if(500 < thestring.length) {
    //  alert("Сообщение слишком длинное.");
    //}
    // если форма валидна и длина капчи не равно пустой строке, то отправляем форму на сервер (AJAX)
    else if ((formValid) && (captcha.length)) {

      // получаем имя, которое ввёл пользователь
      var name = $("#userName").val().replace(/<|>/g, "");
      // получаем номер, который ввёл пользователь
      var phone = $("#userPhone").val().replace(/<|>/g, "");
      // получаем email, который ввёл пользователь
      var email = $("#userMail").val().replace(/<|>/g, "");
      // получаем message, который ввёл пользователь
      //var message = $("#message").val().replace(/<|>/g, "");

      // объект, посредством которого будем кодировать форму перед отправкой её на сервер
      var formData = new FormData();
      // добавить в formData значение 'name'=значение_поля_name
      formData.append('name', name);
      // добавить в formData значение 'phone'=значение_поля_phone
      formData.append('phone', phone);
      // добавить в formData значение 'email'=значение_поля_email
      formData.append('email', email);
      // добавить в formData значение 'message'=значение_поля_email
      //formData.append('message', message);
      
      // добавить в formData значение 'g-recaptcha-response'=значение_recaptcha
      formData.append('g-recaptcha-response', captcha);

      // технология AJAX
      $.ajax({
        //метод передачи запроса - POST
        type: "POST",
        //URL-адрес запроса
        url: "/studio/process.php",
        //передаваемые данные - formData
        data: formData,
        // не устанавливать тип контента, т.к. используется FormData
        contentType: false,
        // не обрабатывать данные formData
        processData: false,
        // отключить кэширование результатов в браузере
        cache: false,
        //при успешном выполнении запроса
        success: function (data) {
          // разбираем строку JSON, полученную от сервера
          var $data =  data;

          // если сервер вернул ответ success, то значит данные отправлены
          if ($data.result == "success") {
            // скрываем форму капчи
            $('#captcha').hide();
            checkbox.disabled = true;
            uname.disabled = true;
            uphone.disabled = true;
            uemail.disabled = true;
            //umessage.disabled = true;
            document.getElementById('userSubmit').disabled = true;
            document.getElementById('userSubmit').value = "Отправлено!";
            document.getElementById('userSubmit').classList.remove('badge');
          } else {
            // Если сервер вернул ответ error, то делаем следующее...
            $('#msgSubmit').text('Произошла ошибка при отправке формы на сервер.');
            // Сбрасываем виджет reCaptcha
            grecaptcha.reset();
            // Если существует свойство msg у объекта $data, то...
            if ($data.msg) {
              // вывести её в элемент у которого id=recaptchaError
              $('#msgSubmit').text($data.msg);
            }
            if ($data.files) {
              $('#msgSubmit').html($('#error').text()+'<br>'+$data.files);
            }
          }
        },
        error: function (request) {
          console.log(request.responseText);
          document.getElementById('msgSubmit').value = "Ошибка...";
        }
      });
    }
  });
});
