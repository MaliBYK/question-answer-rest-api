<h1>Question Answer Rest Api</h1>
<hr />
<h2>This is a rest api which allows you to :</h4>
<ul>
  <li><h4>In account Section you can :</h4></li>
  <li>> Register</li>
  <li>> Login</li>
  <li>> Edit your profile</li>
  <li>> Add profile image, place , about section etc</li>
  <li>> Reset Password With Email Verification</li>
  <hr />
  <li><h4>In Question Section you can :</h4></li>
  <li>> Ask Questions</li>
  <li>> Edit Your Question</li>
  <li>> Delete Your Question</li>
  <li>> See other Questions</li>
  <li>> Like/Undolike Questions</li>
  <li>> Search and filter Questions by title</li>
  <hr />
  <li><h4>In answer Section you can :</h4></li>
  <li>> Answer Questions</li>
  <li>> Edit Your Answers</li>
  <li>> See other Answers</li>
  <li>> Like/Undolike other Answers</li>
  <li>> Filter other Answers by content and user</li>
  <hr />
  <li><h4>In moderation Section you can :</h4></li>
  <li>Admin Section that allow you to :</li>
  <li>>Delete others questions</li>
  <li>>Delete others answers</li>
  <li>>Block a user</li>
</ul>
<h2>HOW TO USE IT</h2>
  <hr>
  <p>First off all, you need to add these thing to environment variables (or create "Config/config.env" to main folder)</p>
  <ul>
  <li>>PORT</li>
  <li>>NODE_ENV("development" or "production")</li>
  <li>>MONGO_URI (local or from mongo)</li>
  <li>>JWT_SECRET_KEY</li>
  <li>>JWT_EXPIRE(ex. 10m)</li>
  <li>>COOKIE_EXPIRE(ex. 10 for 10 seconds)</li>
  <li>>RESET_PASSWORD_EXPIRE(ex. 36000 for 1 hour)</li>
  
  <h4>FOR NODEMAILER (that is how we reset email with email)</h4>
  <li>>SMTP_HOST (ex smtp.gmail.com)</li>
  <li>>SMTP_PORT (ex. 587)</li>
  <li>>SMTP_USER (ex. yourmail@email.com)</li>
  <li>>SMTP_PASS (ex. yourpassword123!)</li>
</ul>
<hr />
		<p>Then install the necessary packages</p>
		<p>Finally open your terminal and type npm run start</p>
<hr>
<h3>
  Made by <a href="http://malibyk.github.io">MaliBYK</a>
  <h3></h3>
</h3>
