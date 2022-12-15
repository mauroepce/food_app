
export const validateForm = (form) => {

    let errors = {};

    // title errors
    if(!form.title) {
        errors.title = "Title is obligatory";
    } else {
        errors.title = "";
    }

    // image errors
    if(!form.image) {
        errors.image = "Image is obligatory";
    } else {
        errors.image = "";
    }

    //  form errors
    if(!form.score) {
        errors.score = "Score is obligatory";
    } else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(form.score)) {
        errors.score = "The score must be between 0 and 100";
    } else {
        errors.score = "";
    }

    // health score errors
    if(!form.healthScore) {
        errors.healthScore = "Health Score is obligatory"
    } else if (!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(form.healthScore)) {
        errors.healthScore = "The Health Score must be between 0 and 100";
    } else {
        errors.healthScore = "";
    }

    // Ready in minutes errors
    if(!form.readyInMinutes) {
        errors.readyInMinutes = "Preparation time is obligatory"
    } else if (!/\b([0-9]|[1-8][0-9]|9[0-9]|[1-4][0-9]{2}|500)\b/gm.test(form.readyInMinutes)) {
        errors.readyInMinutes = "The preparation time cannot exceed 500 minutes or 3 hours"
    } else {
        errors.readyInMinutes = "";
    }

    // summary errors
    if(!form.summary) {
        errors.summary = "Summary or Description is obligatory";
    } else {
        errors.summary = "";
    }

    //  instructions errors
    if(!form.instructions) {
        errors.instructions = "Instructions is obligatory";
    } else {
        errors.instructions = "";
    }

    return errors;
}