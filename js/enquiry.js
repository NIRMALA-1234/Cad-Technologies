const form =
document.getElementById("leadForm");

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbxaBK_X2XE6txVNSchUogcq4eAQbvYP1oqjjleOqYdlzG377QXLUbEimFin3TMGpe_P_Q/exec";

form.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    const selectedCourses =
    Array.from(
        document.querySelectorAll(
        'input[name="courses[]"]:checked'
        )
    )
    .map(course => course.value);

    if(selectedCourses.length === 0){

        alert(
        "Please select at least one course."
        );

        return;
    }

    const phone =
    document
    .getElementById("phone")
    .value
    .trim();

    if(!/^[6-9]\d{9}$/.test(phone)){

        alert(
        "Please enter a valid mobile number."
        );

        return;
    }

    const submitBtn =
    document.querySelector(
    '#leadForm button[type="submit"]'
    );

    submitBtn.disabled = true;

    submitBtn.innerHTML =
    "Submitting...";

    const formData = {

        name:
        document
        .getElementById("name")
        .value
        .trim(),

        status:
        document
        .getElementById("status")
        .value,

        phone:
        phone,

        location:
        document
        .getElementById("location")
        .value
        .trim(),

        courses:
        selectedCourses.join(", ")

    };

    try{

        const response =
        await fetch(
        GOOGLE_SCRIPT_URL,
        {
            method:"POST",

            body:
            JSON.stringify(formData)
        });

        const result =
        await response.json();

        if(result.result === "success"){

            // alert(
            // "Thank you! Our team will contact you shortly."
            // );
            const successModal =
                new bootstrap.Modal(
                document.getElementById("successModal")
                );

                successModal.show();

            form.reset();

        }else{

            alert(
            "Submission failed."
            );

        }

    }catch(error){

        console.error(error);

        alert(
        "Unable to submit enquiry."
        );

    }

    submitBtn.disabled = false;

    submitBtn.innerHTML =
    "Submit Enquiry";

});