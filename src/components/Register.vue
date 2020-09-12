<template>
  <div>
    <div>
      <h1>회원가입</h1>
    </div>
    <div>
      <label for="id">아이디</label>
      <input type="text" id="id" v-model="user.id" />
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input type="password" id="password" v-model="user.password" />
    </div>
    <button @click="Register">회원가입</button>
    <router-link to="/">로그인 화면으로</router-link>
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
    Register: function() {
      this.$http
        .post("/users/register", {
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