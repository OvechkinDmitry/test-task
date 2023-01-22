export let getLoginPageTemplate = () => `<div class="login-form">
        <h2>Login</h2>
        <form action="/src/templates/companies.html" class="login-form__body">
            <div class="login-form__input-group">
                <label for="login-form__username-label">User</label>
                <input class="login-form__username" type="text" placeholder="username" id="username">
                <span class="login-form__error-message error-message"></span>
            </div>
            <div class="login-form__input-group">
                <label for="login-form__password-label">Password</label>
                <input class="login-form__password" type="password" placeholder="password" id="password">
                <span class="login-form__error-message error-message"></span>
            </div>
            <button type="submit" class="login-form__login-button">Login</button>
        </form>
    </div>
`