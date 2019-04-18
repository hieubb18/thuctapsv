
const reportUrl = 'https://script.google.com/macros/s/AKfycbz8FjlnuxfiBhAMrGZOVWuH_QCRsSQfnUcLi9eDJjQ_omd1Kp0f/exec';
const formReport = document.forms['submit-form-report'];
const loading1 = document.querySelector('.js-loading');
const successMessage1 = document.querySelector('.js-success-message');
const errorMessage1 = document.querySelector('.js-error-message');
var form1 = document.getElementById('form-report');
form1.addEventListener('submit', e => {
    e.preventDefault();
    if ($("input[name=MASV]").val() == '') {
        alert('BẠN CẦN NHẬP MÃ SV TRA CỨU THÔNG TIN TRƯỚC KHI THỰC HIỆN THAO TÁC NÀY');
        return false;
    }
    if ($("textarea[name=noidung-congviec]").val().length < 50 ) {
        alert('Nội dung báo cáo tối thiểu 50 kí tự');
        return false;
    }
    showLoadingIndicator();
    fetch(reportUrl, { method: 'POST', body: new FormData(formReport) })
        .then(response => showSuccessMessageReport(response))
        .catch(error => showErrorMessageReport(error));
})
function showLoadingIndicator() {
    formReport.classList.add('is-hidden');
    loading1.classList.remove('is-hidden');
}

function showSuccessMessageReport(response) {
    console.log('Success!', response);
    setTimeout(() => {
        successMessage1.classList.remove('is-hidden');
        loading1.classList.add('is-hidden');
    },1000);
}

function showErrorMessageReport(error) {
    console.error('Error!', error.message);
    setTimeout(() => {
        errorMessage1.classList.remove('is-hidden');
        loading1.classList.add('is-hidden');
    },1000);
}