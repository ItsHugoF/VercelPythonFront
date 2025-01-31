$(document).ready(function () {
    $("#btnShowAll").click(function () {
      $.ajax({
        url: "https://vercel-python-back.vercel.app/api/people",
        method: "GET",
        success: function (people) {
          $("#peopleList").empty();
          people.forEach(function (person) {    
            $("#peopleList").append(
              "<li>ID: " + person.id +
              ", Nombre: " + person.nombre +
              ", Apellido: " + person.apellido +
              ", Edad: " + person.edad + "</li>"
            );
          });
        },
        error: function () {
          alert("Error al obtener la lista de personas.");
        },
      });
    });
  
    $("#formAddPerson").submit(function (evt) {
      evt.preventDefault();
      const personData = {
        id: $("#personId").val(),
        nombre: $("#personName").val(),
        apellido: $("#personSurname").val(),
        edad: $("#personAge").val(),
      };
      $.ajax({
        url: "https://vercel-python-back.vercel.app/api/people",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(personData),
        success: function (created) {
          $("#messageAdd").text("Persona registrada exitosamente.");
          $("#formAddPerson")[0].reset();
        },
        error: function (resp) {
          $("#messageAdd").text(
            "Error al registrar la persona: " + (resp.responseJSON?.message || "")
          );
        },
      });
    });
  
    $("#btnSearchPerson").click(function () {
      const personId = $("#searchId").val();
      if (!personId) {
        $("#searchOutput").text("Por favor ingrese un ID válido.");
        return;
      }
      $.ajax({
        url: "https://vercel-python-back.vercel.app/api/onePerson/" + personId,
        method: "GET",
        success: function (found) {
          $("#searchOutput").html(
            "<p>ID: " + found.id + "</p>" +
            "<p>Nombre: " + found.nombre + "</p>" +
            "<p>Apellido: " + found.apellido + "</p>" +
            "<p>Edad: " + found.edad + "</p>"
          );
        },
        error: function () {
          $("#searchOutput").text("No se encontró la persona con ese ID.");
        },
      });
    });
  });