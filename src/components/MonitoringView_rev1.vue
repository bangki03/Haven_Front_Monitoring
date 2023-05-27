<template>
  <div style="width:100%; height:100%; display: flex; flex-direction: column; justify-content: space-around; align-items: center; background-color: #EFF0F6;">
      <div style="width:98%; text-align: left;">
          여기는 실시간 품질 검사입니다.
      </div>

      <div class="dard-container" style="width:98%;  display:flex; flex-direction: column; justify-content: flex-start;">
        <div class="dard-header"></div>
        <div class="dard-main" style="display:flex; flex-direction: row; align-items: center;">
            <div style="display:flex; flex-direction: column; align-items: flex-start; margin:0.5em 1.0em 0.5em 2.0em;">
                <p class="column-header">제품 시리얼 번호</p>
                <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">2023.01.05 09:22</p>
            </div>
            <div style="display:flex; flex-direction: column; align-items: flex-start; margin:0.5em 1.0em;">
                <p class="column-header">검사 일시</p>
                <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">2023.01.05 12:31</p>
            </div>
            <div style="display:flex; flex-direction: column; align-items: center; margin:0.5em 1.0em;">
                <p class="column-header">검사 시간</p>
                <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">000</p>
            </div>
            <div style="display:flex; flex-direction: column; align-items: center; margin:0.5em 1.0em;">
                <p class="column-header">모델 불확실성</p>
                <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">000</p>
            </div>
            <div style="display:flex; flex-direction: column; align-items: center; margin:0.5em 1.0em;">
                <p class="column-header">검사 결과</p>
                <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">000</p>
            </div>
            
        </div>
        <div class="dard-footer" style="display:flex; flex-direction: column; align-items: center;">
          <div style="display:flex; flex-direction: row; justify-content: flex-end;">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
              <label class="form-check-label" for="flexSwitchCheckDefault">Mask</label>
              
            </div>
          </div>
          <div style="display:flex; flex-direction: row; align-items: center;">
            <img id="Logo" src="../assets/testimage/TestSample1-1.jpg" alt="../assets/testimage/TestSample1-1.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-2.jpg" alt="../assets/testimage/TestSample1-2.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-3.jpg" alt="../assets/testimage/TestSample1-3.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-4.jpg" alt="../assets/testimage/TestSample1-4.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-5.jpg" alt="../assets/testimage/TestSample1-5.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-6.jpg" alt="../assets/testimage/TestSample1-6.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-7.jpg" alt="../assets/testimage/TestSample1-7.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-8.jpg" alt="../assets/testimage/TestSample1-8.jpg" style="height: 96px; width: 114px; padding: 0;" />
          </div>
          <div style="display:flex; flex-direction: row; align-items: center;">
            <img id="Logo" src="../assets/testimage/TestSample2-1.jpg" alt="../assets/testimage/TestSample2-1.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-2.jpg" alt="../assets/testimage/TestSample2-2.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-3.jpg" alt="../assets/testimage/TestSample2-3.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-4.jpg" alt="../assets/testimage/TestSample2-4.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-5.jpg" alt="../assets/testimage/TestSample2-5.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-6.jpg" alt="../assets/testimage/TestSample2-6.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-7.jpg" alt="../assets/testimage/TestSample2-7.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-8.jpg" alt="../assets/testimage/TestSample2-8.jpg" style="height: 96px; width: 114px; padding: 0;" />
          </div>
          <div style="display:flex; flex-direction: row; align-items: center;">
            <img id="Logo" src="../assets/testimage/TestSample1-1.jpg" alt="../assets/testimage/TestSample1-1.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-2.jpg" alt="../assets/testimage/TestSample1-2.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-3.jpg" alt="../assets/testimage/TestSample1-3.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-4.jpg" alt="../assets/testimage/TestSample1-4.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-5.jpg" alt="../assets/testimage/TestSample1-5.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-6.jpg" alt="../assets/testimage/TestSample1-6.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-7.jpg" alt="../assets/testimage/TestSample1-7.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-8.jpg" alt="../assets/testimage/TestSample1-8.jpg" style="height: 96px; width: 114px; padding: 0;" />
          </div>
          <div style="display:flex; flex-direction: row; align-items: center;">
            <img id="Logo" src="../assets/testimage/TestSample2-1.jpg" alt="../assets/testimage/TestSample2-1.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-2.jpg" alt="../assets/testimage/TestSample2-2.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-3.jpg" alt="../assets/testimage/TestSample2-3.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-4.jpg" alt="../assets/testimage/TestSample2-4.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-5.jpg" alt="../assets/testimage/TestSample2-5.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-6.jpg" alt="../assets/testimage/TestSample2-6.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-7.jpg" alt="../assets/testimage/TestSample2-7.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-8.jpg" alt="../assets/testimage/TestSample2-8.jpg" style="height: 96px; width: 114px; padding: 0;" />
          </div>
          <div style="display:flex; flex-direction: row; align-items: center;">
            <img id="Logo" src="../assets/testimage/TestSample1-1.jpg" alt="../assets/testimage/TestSample1-1.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-2.jpg" alt="../assets/testimage/TestSample1-2.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-3.jpg" alt="../assets/testimage/TestSample1-3.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-4.jpg" alt="../assets/testimage/TestSample1-4.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-5.jpg" alt="../assets/testimage/TestSample1-5.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-6.jpg" alt="../assets/testimage/TestSample1-6.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-7.jpg" alt="../assets/testimage/TestSample1-7.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-8.jpg" alt="../assets/testimage/TestSample1-8.jpg" style="height: 96px; width: 114px; padding: 0;" />
          </div>
          <div style="display:flex; flex-direction: row; align-items: center;">
            <img id="Logo" src="../assets/testimage/TestSample2-1.jpg" alt="../assets/testimage/TestSample2-1.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-2.jpg" alt="../assets/testimage/TestSample2-2.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-3.jpg" alt="../assets/testimage/TestSample2-3.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-4.jpg" alt="../assets/testimage/TestSample2-4.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-5.jpg" alt="../assets/testimage/TestSample2-5.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-6.jpg" alt="../assets/testimage/TestSample2-6.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-7.jpg" alt="../assets/testimage/TestSample2-7.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample2-8.jpg" alt="../assets/testimage/TestSample2-8.jpg" style="height: 96px; width: 114px; padding: 0;" />
          </div>
          <div style="display:flex; flex-direction: row; align-items: center;">
            <img id="Logo" src="../assets/testimage/TestSample1-1.jpg" alt="../assets/testimage/TestSample1-1.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-2.jpg" alt="../assets/testimage/TestSample1-2.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-3.jpg" alt="../assets/testimage/TestSample1-3.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-4.jpg" alt="../assets/testimage/TestSample1-4.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-5.jpg" alt="../assets/testimage/TestSample1-5.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-6.jpg" alt="../assets/testimage/TestSample1-6.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-7.jpg" alt="../assets/testimage/TestSample1-7.jpg" style="height: 96px; width: 114px; padding: 0;" />
            <img id="Logo" src="../assets/testimage/TestSample1-8.jpg" alt="../assets/testimage/TestSample1-8.jpg" style="height: 96px; width: 114px; padding: 0;" />
          </div>
        </div>
      </div>



  </div>
</template>

<script>

export default{
  data() {
      return {

      }
  },
  methods: {
    load_data() {
      
    },
  },

  created() {

  },
  mounted() {

  },

}

</script>

<style>
.dard-header {
  width: 100%;
  height: 40px;

  background-color: #BD7C4A;

  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
}
.dard-main {
  width: 100%;
  height: 80px;

  background-color: #F8F8FA;

}
.dard-footer {
  width: 100%;

  background-color: white;

  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
}
.column-header {
  color: #6E738A;
  font-family:'Poppins-Semibold';
  font-size: 0.75rem;
  margin-bottom: 0;
}
#btn-deploy {
color: #2777E4;
background-color: #F0F0F5;
border-color: #D2E7FF;
cursor: pointer;

display: inline-block;
font-weight: 400;
text-align: center;
white-space: nowrap;
vertical-align: middle;
border: 1px solid transparent;

margin: 0 0.25rem;
padding: 0.25rem 0.5rem;
font-size: 0.875rem;
line-height: 1.5;
border-radius: 1.0rem;

font-family:'NotoSansKR-Light';
font-weight: bold;
}
</style>