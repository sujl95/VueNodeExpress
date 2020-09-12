<template>
  <div>
    <div>
      <h1>로그인</h1>
    </div>
    <div>
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="user.id" />
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="user.password" />
    </div>
    <button @click="login">로그인</button>
    <router-link to="/Register">회원가입 화면으로</router-link>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      user: {
        id: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      this.$http
        .post("/users/Login", {
          id: this.user.id,
          password: this.user.password
        })
        .then(res => {
          alert(res.data.message);
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>