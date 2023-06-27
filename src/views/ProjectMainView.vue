<template>
    <div style="width:100vw; height:100vh; display:flex; flex-direction: row; justify-content: flex-start;">
        <div id="navbar" style="">

            <a href="/mypage" class="d-flex align-items-center mb-3 link-dark text-decoration-none" style="justify-content: flex-start;">
                <img
                    id="Logo"
                    src="../assets/Icon_Topbar.png"
                    alt="../assets/Icon_Topbar.png"
                    style="margin:0.5em auto 0.5em 1.0em;"
                />
            </a>

            <!-- <div id="menu_collapse1" class="btn btn-toggle" style="display:flex; flex-direction: row; margin: 0.5em 0.5em 0.5em 1.0em; padding: 0; align-items: center; justify-content: space-between; color:white;"
            data-bs-toggle="collapse" data-bs-target="#home-collapse">
                <div style="display:inline-flex; flex-direction: row; align-items: center;">
                    <img
                        id="Icon_Sidebar"
                        src="../assets/Icon_Sidebar_Quality.png"
                        alt="../assets/Icon_Sidebar_Quality.png"
                        style="height: 17px;"
                    />
                    <p style="margin-bottom: 0; margin-left:0.75em;"> AI 품질 개선</p>
                </div>

                <img
                    id="Icon_Sidebar_Expand"
                    src="../assets/Icon_Sidebar_Open.png"
                    alt="../assets/Icon_Sidebar_Open.png"
                    style=""
                />
            </div>

            <div class="collapse" id="home-collapse" style="">
                <ul class="btn-toggle-nav list-unstyled fw-normal pb-2">
                    <div style="display:flex; flex-direction:row; justify-content: flex-start; margin-left: calc(1.75em + 17px); margin-bottom: 0.5em;">
                        <a href="#" style="color: white; text-decoration: none;">데이터 라벨링</a>
                    </div>
                    <div style="display:flex; flex-direction:row; justify-content: flex-start; margin-left: calc(1.75em + 17px); margin-bottom: 0.5em;">
                        <a href="#" style="color: white; text-decoration: none;">AI모델 학습</a>
                    </div>
                    <div style="display:flex; flex-direction:row; justify-content: flex-start; margin-left: calc(1.75em + 17px); margin-bottom: 0.5em;">
                        <a href="#" style="color: white; text-decoration: none;">AI모델 검증</a>
                    </div>
                </ul>

            </div> -->


            <div class="btn btn-toggle" style="display:flex; flex-direction: row; margin: 0.5em 0.5em 0.5em 1.0em; padding: 0; align-items: center; justify-content: space-between; color:white;" @click="showMenu = !showMenu">
                <div style="display:inline-flex; flex-direction: row; align-items: center;">
                    <img src="../assets/Icon_Sidebar_Quality.png" alt="../assets/Icon_Sidebar_Quality.png" style="height: 17px;" />
                    <p style="margin-bottom: 0; margin-left:0.75em;"> 실시간 품질 검사</p>
                </div>
            </div>


            <a href="#" class="d-flex align-items-center text-decoration-none" style="justify-content: flex-start;">
                <div style="display:inline-flex; flex-direction: row; align-items: center; margin: 0.5em 0.5em 0.5em 1.0em; padding: 0; color: white;">
                    <img
                        id="Icon_Sidebar"
                        src="../assets/Icon_Sidebar_Question.png"
                        alt="../assets/Icon_Sidebar_Question.png"
                        style="height: 17px;"
                    />
                    <p style="margin-bottom: 0; margin-left:0.75em;"> 문의하기</p>
                </div>

            </a>

            <a href="#" class="d-flex align-items-center text-decoration-none" style="justify-content: flex-start;">
                <div style="display:inline-flex; flex-direction: row; align-items: center; margin: 0.5em 0.5em 0.5em 1.0em; padding: 0; color: white;">
                    <img
                        id="Icon_Sidebar"
                        src="../assets/Icon_Sidebar_Help.png"
                        alt="../assets/Icon_Sidebar_Help.png"
                        style="height: 17px;"
                    />
                    <p style="margin-bottom: 0; margin-left:0.75em;"> 도움말</p>
                </div>
            </a>

            <a href="#" class="d-flex align-items-center text-decoration-none" style="justify-content: flex-start;">
                <div style="display:inline-flex; flex-direction: row; align-items: center; margin: 0.5em 0.5em 0.5em 1.0em; padding: 0; color: white;">
                    <!-- <img
                        id="Logo"
                        src="../assets/LogOut.png"
                        alt="../assets/LogOut.png"
                        style="height: 17px;" @click="Logout"
                    /> -->
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    <p style="margin-bottom: 0; margin-left:0.75em;"> 로그아웃</p>
                </div>
            </a>


        </div>

        <!-- <div style="width: calc(100vw - 200px); display:flex; flex-direction: column; justify-content: flex-start; background-color: #EFF0F6; ">
            <div id="topbar2">
                <div style="display:inline-flex; margin-right: 1em;">
                    <p style="margin-left: auto; margin-bottom:auto;" @click="Logout">로그아웃</p>
                    <img
                        id="Logo"
                        src="../assets/LogOut.png"
                        alt="../assets/LogOut.png"
                        style="height: 15px; width: 15px; padding: 0; margin-top: 3px;" @click="Logout"
                    />
                </div>

                <div>

                </div>
            </div>
            <RouterView>  </RouterView>
        </div> -->

        <RouterView>  </RouterView>

    </div>
</template>

<script>

// import $ from 'jquery';

export default{
    components: {

    },
    data() {
        return{
            showMenu: true,
        }
    },
    methods: {
        routespage() {
            if (!this.$store.state.account.LoginActive) {
                alert("Please, Login First")
                this.$router.push('/')
            }
        },
        Logout() {
            this.$store.commit("setLogout");
            alert('Logout')
            this.$router.push('/')
        },

    },
    mounted() {
        this.routespage()
        this.$store.commit('loadSessionStorageProject')
    },
}

</script>

<style>
#navbar {
    width:200px;
    height: 100vh;
    background-color: #BD7C4A;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

}

.active {
    font-weight: bold;
}

#topbar2 {
    /* width: calc(100vw - 200px); */
    height: 65px;
    background-color: white;

    display: flex;
    flex-direction: row-reverse;
    align-items: center;


}
</style>