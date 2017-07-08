function getFiles() {
    //$.ajax performs an asynchronous http request
    return $.ajax('/api/blog')
        .then(res => {
        console.log("this is what we get from getFiles()", res);
        return res;
        })
        .fail(err => {
        console.log("error in getFiles()", err);
        throw err;
        });
}

//refreshes the template with the list of files(posts)
function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  //calls the getFiles function defined above
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

//to submit a new post or submit changes when editing an existing post
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

//to cancel adding a new post or editing an existing post
function cancelNewPost() {
    console.log("you changed your mind");
    //hides the new post form
    toggleAddNewPost();
}

//to edit an existing post
function editPost(id){
    console.log("this is where we edit post", id);

    const file = window.fileList.find(file => file._id === id);
        //this populates the form with the current info that we want to edit
        if (file) {
            clearForm(file); 
            toggleFormVisibility();  
        }
}

//to clear the New Post form
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

//to delete an existing post
function deletePost(id) {
    console.log(id + "is being deleted");

    // if (confirm("Are you sure?")) {
        
       return $.ajax({
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
//   }
}
