$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value

        // Make request with GitHub
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data:{
                client_id: '180baeb2270d29481616',
                client_secret: '7adeb0eb09732666bab82f483c31b359e3a28b5a'
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data:{
                    client_id: '180baeb2270d29481616',
                    client_secret: '7adeb0eb09732666bab82f483c31b359e3a28b5a',
                    sort: 'created: asc',
                    per_page: 5
                } 
            }).done(function(repos){
                $.each(repos, function(i, repos){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repos.name}</strong>: ${repos.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Public Repos: ${repos.forks_count}</span> <br>
                                    <span class="label label-primary">Primary Gists: ${repos.watchers_count} </span> <br>
                                    <span class="label label-success">Followers: ${repos.startgazers_count} </span> <br>
                                </div>
                                <div class="col-md-2">
                                 <a href="${repos.html_url}" target="_blank" class="btn btn-default">Repo Page</a>   
                                </div>
                            </div>
                        </div><br>
                    `)
                })

            })
                

            $('#profile').html(`
            <div>
            <h3>${user.name}</h3>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <img  class="thumbnail avatar" src="${user.avatar_url}">
                    <a targets="_blank" class="btn btn-primary btn-block" href="${user.html_url }">Check Profile</a>
                </div>
                <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span> <br>
                <span class="label label-primary">Primary Gists: ${user.public_gists} </span> <br>
                <span class="label label-success">Followers: ${user.followers} </span> <br>
                <span class="label label-info">Following: ${user.following}</span> <br><br>

                <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company} </li>
                    <li class="list-group-item">Website/blog: ${user.blog} </li>
                    <li class="list-group-item">Location: ${user.location} </li>
                    <li class="list-group-item">Member Since: ${user.created_at} </li>
                </ul>
                </div>
            </div>
            <div>
                <h3 class="pag-header">Latest Repos</h3>
                <div id="repos"></div>
            </div>
            `)
        })
    })
})