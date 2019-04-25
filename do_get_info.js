// Get the input field
var input = document.getElementById("inMaSV");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("btnDoSV").click();
  }
});

function stepGetSinhVien() {
    var masv = $.trim($("input[name='txtMaSV']").val());
    if(masv == ''){
        alert("VUI LÒNG NHẬP MÃ SINH VIÊN");
        return false;
    }
    doLoading()
        .then(doGetSinhVien)
        .then(doComplete);
}
function doLoading() {
    return new Promise(function (resolve, reject) {
        document.querySelector('.js-loading').classList.remove('is-hidden');
        resolve();
    });
}
function doGetSinhVien() {
    return new Promise(function (resolve, reject) {
        sinhVienGet()
        resolve();
    });
}

function doComplete() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector('.js-loading').classList.add('is-hidden');
        },1000);
        resolve();
    });
}

function sinhVienGet() {
	$("#InfoSV").html('');
	
    var masv = $.trim($("input[name='txtMaSV']").val()).replace(/ /g,'');
    
    var worksheets = [
        '', // defaults to first worksheet without id
        'ouab0ad'];

    worksheets.forEach(function (worksheet) {
        $.googleSheetToJSON('1XjLtjloEkXKTDAsDLanA6Ace9ujINXbw7dClFAn5yeA', worksheet)
            .done(function (rows) {
                var strText = "<table border=1>";
                var strText = "<table class='dtable'>";
                strText += "<tr> <th>SĐT Giảng Viên</th>  <th>Email GV</th>  <th>Tên GV</th>  <th>Tên SV</th>  <th>Lớp</th> <th>Mã SV</th>  <th>Ngành</th>  <th>Ngày sinh</th>  <th>Email SV</th>  <th>Số ĐT </th>  <th>Môn Học</th>";
                var count = 0;
                rows.forEach(function (row) {
                    var strMaSV = row['masv'].replace(/ /g,'');
                    if (strMaSV == masv) {
                        count++;
                        strText += "<tr>";
                        Object.getOwnPropertyNames(row).forEach(function (name) {
                            if (name == 'sotc' || name == 'tt' || name == 'mand' || name == 'mamh' || name == 'nhom' )
                                return;
                            if (name == 'sv-email')
                                $("input[name=EMAIL]").val(row[name]);
                            if (name == 'sv-sdt')
                                $("input[name=DIENTHOAI]").val(row[name]);
                            var val = [].concat(row[name]).join(' / ');
                            strText += "<td>" + val + "</td>";
                        });
                        strText += "</tr>";
                        strText += "<div class='tools-sv'><div class='box-sv'><div class='box-sv-responsive'><button class='btn_' onclick='doupdateInfo();'>Cập nhật thông tin</button></div>";
                        strText += "<div class='box-sv-responsive'><button class='btn_' onclick='doReport();'>Báo cáo</button></div><div class='clear'></div></div></div>";
                        
                        
                    }
                    return;
                });
                if (count == 0)
				{
                    $("#InfoSV").html('Không tìm thấy thông tin sinh viên');
					document.querySelector('.js-showupdate').classList.add('is-hidden');
				}
                else {
                    $("#InfoSV").html(strText);
                    $("input[name=MASV]").val(masv);
					//document.querySelector('.js-showupdate').classList.remove('is-hidden');
                }
            })
            .fail(function (err) {
                console.log('error!', err);
            });
    });
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbybJxIH0Q7NeJyxyY6HOznOUCMJ1IGPd5-l3SAojmvDLAMGPS3h/exec';
const form = document.forms['submit-info-company'];
const loading = document.querySelector('.js-loading');
const successMessage = document.querySelector('.js-success-message-update');
const errorMessage = document.querySelector('.js-error-message-update');
const id_getInfo_company = document.querySelector('.js-showupadteCompany');

form.addEventListener('submit', e => {
    e.preventDefault();
    var value_input = $("input[name=MASV]").val().length;
    if (value_input == 0) {
        alert('BẠN CẦN NHẬP MÃ SV TRA CỨU THÔNG TIN TRƯỚC KHI THỰC HIỆN THAO TÁC NÀY');
        return false;
    }
    showLoadingIndicator();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => showSuccessMessage(response))
        .catch(error => showErrorMessage(error));
})

function showLoadingIndicator() {
    form.classList.add('is-hidden');
    loading.classList.remove('is-hidden');
}

function showSuccessMessage(response) {
    console.log('Success!', response);
    setTimeout(() => {
        successMessage.classList.remove('is-hidden');
        loading.classList.add('is-hidden');
        id_getInfo_company.classList.add('is-hidden');
    },1000);
    setTimeout(() => {
        successMessage.classList.add('is-hidden');

    },5000)
}

function showErrorMessage(error) {
    console.error('Error!', error.message);
    setTimeout(() => {
        errorMessage.classList.remove('is-hidden');
        loading.classList.add('is-hidden');
    },1000);
}


function doupdateInfo(){
    
	document.querySelector('.js-showupdate').classList.remove('is-hidden');
	document.querySelector('.js-showupadteCompany').classList.remove('is-hidden');
    document.querySelector('.js-showReport').classList.add('is-hidden');
    document.querySelector('.js-success-message-update').classList.add('is-hidden');
    document.querySelector('.js-success-message').classList.add('is-hidden');


}
function doReport(){
    document.querySelector('.js-showupdate').classList.add('is-hidden');
    document.querySelector('.js-showupadteCompany').classList.add('is-hidden');
    document.querySelector('.js-showReport').classList.remove('is-hidden');
    document.querySelector('.js-success-message-update').classList.add('is-hidden');
    document.querySelector('.js-success-message').classList.add('is-hidden');
    
}



