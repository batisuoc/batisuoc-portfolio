var itemsPerPage = 4,
  currentPage = 1;
var rows,
  pages = 0,
  records;
// Render row by from, to
function showRecords(from, to) {
  let rowsCollect = document.getElementById("list-items").rows;
  for (let i = 0; i < rowsCollect.length; i++) {
    if (i < from || i >= to) rowsCollect[i].style.display = "none";
    else rowsCollect[i].style.display = "";
  }
}

function showPage(pageNumber) {
  currentPage = pageNumber; // Set new current page number
  let from = (pageNumber - 1) * itemsPerPage;
  let to = from + itemsPerPage;
  showRecords(from, to);
}

function showPreviousPage() {
  if (currentPage > 1) showPage(currentPage - 1);
}

function showNextPage() {
  if (currentPage < pages) showPage(currentPage + 1);
}

function showDescription(itemID) {
  var descripHTML;
  $.get(`http://demo6370041.mockable.io/course/${itemID}`, jsonData => {
    descripHTML = `<tr><td colspan="2"><p>Description: ${
      jsonData["description"]
    }</p><p>Textbook: ${jsonData["textbook"]}</p></td></tr>`;
  }).done(function() {
    $(`#${itemID}`).after(descripHTML);
  });
}

$(document).ready(function() {
  // Get list of subjects id and name
  $.get("http://demo6370041.mockable.io/getcourses", jsonObject => {
    // console.log(jsonObject);
    let listSubjects = jsonObject.data;
    listSubjects.forEach(function(element) {
      let tr = document.createElement("tr");
      tr.setAttribute("id", `${element["id"]}`);
      tr.setAttribute("onclick", `showDescription(${element["id"]})`);
      tr.innerHTML = `<td>${element["id"]}</td><td>${element["name"]}</td>`;
      $("#list-items").append(tr);
    });
  }).done(function() {
    records = $("#list-items tr").length - 1;
    pages = Math.ceil(records / itemsPerPage);
    //Render Pagination control base on Page length
    let pageHTML = `<ul id="myPageNavPosition" class="pagination custom-pagination">
      <li class="page-item" onclick="showPreviousPage()">
        <a class="page-link">Previous</a>
      </li>`;
    for (let i = 1; i <= pages; i++) {
      pageHTML += `<li onclick="showPage(${i})" class="page-item"><a class="page-link">${i}</a></li>`;
    }
    pageHTML += `<li class="page-item" onclick="showNextPage()">
                  <a class="page-link">Next</a>
                </li>
    </ul>`;
    $("#pagination-control").html(pageHTML);
    // Render page 1 in the first time loading
    showPage(1);
  });
});
