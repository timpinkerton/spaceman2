function getFiles() {
    return $.ajax('/api/blog')
        .then(res => {
        console.log("Results from getFiles()", res);
        return res;
        })
        .fail(err => {
        console.log("Error in getFiles()", err);
        throw err;
        });
}

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {
    //saves the array to the global window object, so we can select a specific post when editing
      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

//this will show/hide the form to add a new post and clear for form
function toggleAddNewPost() {
  clearForm({});
  toggleFormVisibility();
}

//this shows/hides the form without changing the input fields
function toggleFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

function submitNewPost() {
    console.log("You added a new post!");


    const fileData = {
        title: $('#newPostTitle').val(),
        body: $('#newPostBody').val(),
        author: $('#newPostAuthor').val(),
        _id: $('#post-id').val() 
    };

    //If _id (a post) already exist, method will be PUT and _id is appended to the url. If not, it's a new POST
    let method, url;
        if (fileData._id) {
            method = 'PUT', 
            url = '/api/blog/' + fileData._id;
        } else {
            method = 'POST',
            url = '/api/blog'
        }
    

    $.ajax({
        type: method,
        url: url,
        data: JSON.stringify(fileData),
        dataType: 'json',
        contentType : 'application/json',
    })
    .done(function(response) {
        console.log("new post!");
        refreshFileList();
        toggleAddNewPost();
    })
    .fail(function(error) {
        console.log("did not work!", error);
    });
    
    console.log('File data for the new post', fileData); 
}


function cancelNewPost() {
    console.log("you changed your mind");
    //hides the new post form
    toggleAddNewPost();
}

function editPost(id){
    console.log("this is where we edit post", id);

    const file = window.fileList.find(file => file._id === id);
        //this populates the form with the current info that we want to edit
        if (file) {
            clearForm(file); 
            toggleFormVisibility();  
        }
}

function clearForm(data){
    data = data || {};

    const file = {
        title: data.title || '',
        body: data.body || '',
        author: data.author || '',
        _id: data._id || '',
    };

    $('#newPostTitle').val(file.title);
    $('#newPostBody').val(file.body);
    $('#newPostAuthor').val(file.author);
    $('#post-id').val(file._id);
}

function deletePost(id) {
    console.log("file " + id + "is about to die");

    if (confirm("Are you sure?")) {
        $.ajax({
        type: 'DELETE',
        url: '/api/blog/' + id,
        dataType: 'json',
        contentType : 'application/json',
        })
        .done(function(response) {
            console.log(id, " has been marked as deleted.");
            refreshFileList();
        })
        .fail(function(error) {
            console.log("This delete did not work.", error);
        })
  }
}