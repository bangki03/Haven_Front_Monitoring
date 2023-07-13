<template>
  <div style="width:100%; height:100%; display: flex; flex-direction: column; justify-content: space-around; align-items: center; background-color: #EFF0F6;">
    <!-- <div style="width:98%; text-align: left;">
        여기는 실시간 품질 검사입니다.
    </div> -->

    <div class="dard-container" style="width:98%;  display:flex; flex-direction: column; justify-content: flex-start;">
      <div class="dard-header" style="display:flex; flex-direction: row; justify-content:flex-start; align-items: center; " >
        <div v-show="isModalOpen" id="btn-back" @click="closeModal" style="margin-left:1.0em; cursor: pointer;">
          <i id="arrow-previous" class="fa fa-arrow-left image-arrows" style="font-size: 15px; transform: scaleX(1); color: white;"/> 뒤로가기
        </div>
        <div v-show="isModalOpen" class="form-check form-switch" style="margin-left: auto; margin-right:1.0em; display:flex; align-items:center;">
          <input class="form-check-input" style="height:1.5em; width:2.5em; margin-top:0.5em; margin-right:1em;" type="checkbox" id="flexSwitchCheckMask" v-model="isMaskSwitch" @change="SwitchMaskChange">
          <label class="form-check-label" style="color: white; font-weight:200;font-size: 1.2em; margin-right:2em; margin-top:0.3em;" for="flexSwitchCheckMask">Mask</label>
        </div>
      </div>
      <div class="dard-main" style="display:flex; flex-direction: row; align-items: center;">
        <div style="display:flex; flex-direction: column; align-items: flex-start; margin:0.5em 10.0em 0.5em 2.0em;">
            <p class="column-header">모델 정보</p>
            <div style="display:flex; flex-direction: row; justify-content: flex-start; align-items: center;">
              <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">{{ Summary_ModelInfo.name }}</p>
              <div style="position:relative">
                <i class="fa-solid fa-circle-info" style="margin-left: 0.3rem;" @click="openModelInfo"></i>
                <div v-show="showModel" style="position:absolute; top:100%; width:1200%; left:-400%; background-color: lightgray; border-radius: 1rem; display:flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; cursor:default;">
                  <p style="margin-left:1rem; margin-top:1rem; margin-bottom: 0.5rem; font-family: Poppins-SemiBold; font-weight:600;">모델명 : {{ Summary_ModelInfo.name }}</p>
                  <p style="margin-left:1rem; margin-bottom: 0.5rem; font-family: Poppins-SemiBold; font-weight:600;">모델id : {{ Summary_ModelInfo.id }}</p>
                  <p style="margin-left:1rem; margin-bottom: 0.5rem; font-family: Poppins-SemiBold; font-weight:600;">정확도 : {{ Summary_ModelInfo.val_score }}</p>
                  <p style="margin-left:1rem; margin-bottom: 1.0rem; font-family: Poppins-SemiBold; font-weight:600;">설명 : {{ Summary_ModelInfo.description }}</p>
                </div>
              </div>
              
            </div>
        </div>
        <div style="display:flex; flex-direction: column; align-items: flex-start; margin:0.5em 1.0em;">
            <p class="column-header">제품 시리얼 번호</p>
            <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">{{ Summary_TestInfo.serialNo }}</p>
        </div>
        <div style="display:flex; flex-direction: column; align-items: flex-start; margin:0.5em 1.0em;">
            <p class="column-header">검사 일시</p>
            <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">{{ Summary_TestInfo.date }}</p>
        </div>
        <div style="display:flex; flex-direction: column; align-items: center; margin:0.5em 1.0em;">
            <p class="column-header">검사 시간</p>
            <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">{{ Summary_TestInfo.time }}</p>
        </div>
        <div style="display:flex; flex-direction: column; align-items: center; margin:0.5em 1.0em;">
            <p class="column-header">모델 불확실성</p>
            <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;">{{ Summary_TestInfo.uncertainty }}</p>
        </div>
        <div style="display:flex; flex-direction: column; align-items: center; margin:0.5em 1.0em;">
            <p class="column-header">검사 결과</p>
            <p style="font-family: Poppins-SemiBold; font-size:1.5rem; margin-bottom:0;" :style="{'color': Summary_TestInfo.result === 'NG' ? 'red' : 'black'}" >{{ Summary_TestInfo.result }}</p>
        </div>
        <div v-if="status_application === 'ready'" id="btn-start" style="margin-left: auto; margin-right: 3.0em;" @click="click_start">검사 시작</div>
        <div v-else-if="status_application === 'busy'" id="btn-stop" style="margin-left: auto; margin-right: 5.5em; margin-top: -0.5rem ;pointer-events: none;" ><fade-loader :color="'#BD7C4A'" :height="'10px'" :width="'5px'" :radius="'10px'"></fade-loader></div>
        <div v-else-if="status_application === 'running'" id="btn-stop" style="margin-left: auto; margin-right: 3.0em;" @click="click_stop">검사 중지</div>
        <!-- <div id="btn-tmp" style="margin-left: 1.0em; margin-right: 3.0em;" @click="initialize">임시 front 상태 초기화</div> -->

      </div>
      <!-- <div style="background-color: white;">
        <div style="display:flex; flex-direction: row; justify-content: space-around;">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckMonitor" v-model="monitorSwitch" @change="SwitchMonitorChange">
            <label class="form-check-label" for="flexSwitchCheckMonitor">Monitor</label>
          </div>
        </div>
      </div> -->
      <div v-show="!isModalOpen" class="dard-footer" style="display:flex; flex-direction: column; align-items: center;">
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.A1.status" id="A1" class="fill-image" :src="ImageList.A1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> A1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="A1" @click="OpenModal" :class="{ 'green-overlay': ImageList.A1.result === 'OK', 'red-overlay': ImageList.A1.result === 'NG', 'none-overlay': ImageList.A1.result !== 'OK' && ImageList.A1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.A2.status" id="A2" class="fill-image" :src="ImageList.A2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> A2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="A2" @click="OpenModal" :class="{ 'green-overlay': ImageList.A2.result === 'OK', 'red-overlay': ImageList.A2.result === 'NG', 'none-overlay': ImageList.A2.result !== 'OK' && ImageList.A2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.A3.status" id="A3" class="fill-image" :src="ImageList.A3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> A3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="A3" @click="OpenModal" :class="{ 'green-overlay': ImageList.A3.result === 'OK', 'red-overlay': ImageList.A3.result === 'NG', 'none-overlay': ImageList.A3.result !== 'OK' && ImageList.A3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.A4.status" id="A4" class="fill-image" :src="ImageList.A4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> A4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="A4" @click="OpenModal" :class="{ 'green-overlay': ImageList.A4.result === 'OK', 'red-overlay': ImageList.A4.result === 'NG', 'none-overlay': ImageList.A4.result !== 'OK' && ImageList.A4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.A5.status" id="A5" class="fill-image" :src="ImageList.A5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> A5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="A5" @click="OpenModal" :class="{ 'green-overlay': ImageList.A5.result === 'OK', 'red-overlay': ImageList.A5.result === 'NG', 'none-overlay': ImageList.A5.result !== 'OK' && ImageList.A5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.A6.status" id="A6" class="fill-image" :src="ImageList.A6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> A6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="A6" @click="OpenModal" :class="{ 'green-overlay': ImageList.A6.result === 'OK', 'red-overlay': ImageList.A6.result === 'NG', 'none-overlay': ImageList.A6.result !== 'OK' && ImageList.A6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.A7.status" id="A7" class="fill-image" :src="ImageList.A7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> A7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="A7" @click="OpenModal" :class="{ 'green-overlay': ImageList.A7.result === 'OK', 'red-overlay': ImageList.A7.result === 'NG', 'none-overlay': ImageList.A7.result !== 'OK' && ImageList.G1.result !== 'NG' }"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.B1.status" id="B1" class="fill-image" :src="ImageList.B1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> B1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="B1" @click="OpenModal" :class="{ 'green-overlay': ImageList.B1.result === 'OK', 'red-overlay': ImageList.B1.result === 'NG', 'none-overlay': ImageList.B1.result !== 'OK' && ImageList.B1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.B2.status" id="B2" class="fill-image" :src="ImageList.B2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> B2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="B2" @click="OpenModal" :class="{ 'green-overlay': ImageList.B2.result === 'OK', 'red-overlay': ImageList.B2.result === 'NG', 'none-overlay': ImageList.B2.result !== 'OK' && ImageList.B2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.B3.status" id="B3" class="fill-image" :src="ImageList.B3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> B3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="B3" @click="OpenModal" :class="{ 'green-overlay': ImageList.B3.result === 'OK', 'red-overlay': ImageList.B3.result === 'NG', 'none-overlay': ImageList.B3.result !== 'OK' && ImageList.B3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.B4.status" id="B4" class="fill-image" :src="ImageList.B4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> B4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="B4" @click="OpenModal" :class="{ 'green-overlay': ImageList.B4.result === 'OK', 'red-overlay': ImageList.B4.result === 'NG', 'none-overlay': ImageList.B4.result !== 'OK' && ImageList.B4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.B5.status" id="B5" class="fill-image" :src="ImageList.B5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> B5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="B5" @click="OpenModal" :class="{ 'green-overlay': ImageList.B5.result === 'OK', 'red-overlay': ImageList.B5.result === 'NG', 'none-overlay': ImageList.B5.result !== 'OK' && ImageList.B5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.B6.status" id="B6" class="fill-image" :src="ImageList.B6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> B6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="B6" @click="OpenModal" :class="{ 'green-overlay': ImageList.B6.result === 'OK', 'red-overlay': ImageList.B6.result === 'NG', 'none-overlay': ImageList.B6.result !== 'OK' && ImageList.B6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.B7.status" id="B7" class="fill-image" :src="ImageList.B7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> B7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="B7"  @click="OpenModal" :class="{ 'green-overlay': ImageList.B7.result === 'OK', 'red-overlay': ImageList.B7.result === 'NG', 'none-overlay': ImageList.B7.result !== 'OK' && ImageList.B7.result !== 'NG' }"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.C1.status" id="C1" class="fill-image" :src="ImageList.C1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> C1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="C1" @click="OpenModal" :class="{ 'green-overlay': ImageList.C1.result === 'OK', 'red-overlay': ImageList.C1.result === 'NG', 'none-overlay': ImageList.C1.result !== 'OK' && ImageList.C1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.C2.status" id="C2" class="fill-image" :src="ImageList.C2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> C2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="C2" @click="OpenModal" :class="{ 'green-overlay': ImageList.C2.result === 'OK', 'red-overlay': ImageList.C2.result === 'NG', 'none-overlay': ImageList.C2.result !== 'OK' && ImageList.C2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.C3.status" id="C3" class="fill-image" :src="ImageList.C3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> C3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="C3" @click="OpenModal" :class="{ 'green-overlay': ImageList.C3.result === 'OK', 'red-overlay': ImageList.C3.result === 'NG', 'none-overlay': ImageList.C3.result !== 'OK' && ImageList.C3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.C4.status" id="C4" class="fill-image" :src="ImageList.C4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> C4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="C4" @click="OpenModal" :class="{ 'green-overlay': ImageList.C4.result === 'OK', 'red-overlay': ImageList.C4.result === 'NG', 'none-overlay': ImageList.C4.result !== 'OK' && ImageList.C4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.C5.status" id="C5" class="fill-image" :src="ImageList.C5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> C5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="C5" @click="OpenModal" :class="{ 'green-overlay': ImageList.C5.result === 'OK', 'red-overlay': ImageList.C5.result === 'NG', 'none-overlay': ImageList.C5.result !== 'OK' && ImageList.C5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.C6.status" id="C6" class="fill-image" :src="ImageList.C6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> C6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="C6" @click="OpenModal" :class="{ 'green-overlay': ImageList.C6.result === 'OK', 'red-overlay': ImageList.C6.result === 'NG', 'none-overlay': ImageList.C6.result !== 'OK' && ImageList.C6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.C7.status" id="C7" class="fill-image" :src="ImageList.C7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> C7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="C7" @click="OpenModal" :class="{ 'green-overlay': ImageList.C7.result === 'OK', 'red-overlay': ImageList.C7.result === 'NG', 'none-overlay': ImageList.C7.result !== 'OK' && ImageList.C7.result !== 'NG' }"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.D1.status" id="D1" class="fill-image" :src="ImageList.D1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> D1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="D1" @click="OpenModal" :class="{ 'green-overlay': ImageList.D1.result === 'OK', 'red-overlay': ImageList.D1.result === 'NG', 'none-overlay': ImageList.D1.result !== 'OK' && ImageList.D1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.D2.status" id="D2" class="fill-image" :src="ImageList.D2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> D2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="D2" @click="OpenModal" :class="{ 'green-overlay': ImageList.D2.result === 'OK', 'red-overlay': ImageList.D2.result === 'NG', 'none-overlay': ImageList.D2.result !== 'OK' && ImageList.D2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.D3.status" id="D3" class="fill-image" :src="ImageList.D3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> D3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="D3" @click="OpenModal" :class="{ 'green-overlay': ImageList.D3.result === 'OK', 'red-overlay': ImageList.D3.result === 'NG', 'none-overlay': ImageList.D3.result !== 'OK' && ImageList.D3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.D4.status" id="D4" class="fill-image" :src="ImageList.D4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> D4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="D4" @click="OpenModal" :class="{ 'green-overlay': ImageList.D4.result === 'OK', 'red-overlay': ImageList.D4.result === 'NG', 'none-overlay': ImageList.D4.result !== 'OK' && ImageList.D4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.D5.status" id="D5" class="fill-image" :src="ImageList.D5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> D5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="D5" @click="OpenModal" :class="{ 'green-overlay': ImageList.D5.result === 'OK', 'red-overlay': ImageList.D5.result === 'NG', 'none-overlay': ImageList.D5.result !== 'OK' && ImageList.D5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.D6.status" id="D6" class="fill-image" :src="ImageList.D6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> D6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="D6" @click="OpenModal" :class="{ 'green-overlay': ImageList.D6.result === 'OK', 'red-overlay': ImageList.D6.result === 'NG', 'none-overlay': ImageList.D6.result !== 'OK' && ImageList.D6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.D7.status" id="D7" class="fill-image" :src="ImageList.D7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> D7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="D7" @click="OpenModal" :class="{ 'green-overlay': ImageList.D7.result === 'OK', 'red-overlay': ImageList.D7.result === 'NG', 'none-overlay': ImageList.D7.result !== 'OK' && ImageList.D7.result !== 'NG' }"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.E1.status" id="E1" class="fill-image" :src="ImageList.E1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> E1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="E1" click="OpenModal" :class="{ 'green-overlay': ImageList.E1.result === 'OK', 'red-overlay': ImageList.E1.result === 'NG', 'none-overlay': ImageList.E1.result !== 'OK' && ImageList.E1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.E2.status" id="E2" class="fill-image" :src="ImageList.E2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> E2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="E2" @click="OpenModal" :class="{ 'green-overlay': ImageList.E2.result === 'OK', 'red-overlay': ImageList.E2.result === 'NG', 'none-overlay': ImageList.E2.result !== 'OK' && ImageList.E2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.E3.status" id="E3" class="fill-image" :src="ImageList.E3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> E3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="E3" @click="OpenModal" :class="{ 'green-overlay': ImageList.E3.result === 'OK', 'red-overlay': ImageList.E3.result === 'NG', 'none-overlay': ImageList.E3.result !== 'OK' && ImageList.E3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.E4.status" id="E4" class="fill-image" :src="ImageList.E4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> E4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="E4" @click="OpenModal" :class="{ 'green-overlay': ImageList.E4.result === 'OK', 'red-overlay': ImageList.E4.result === 'NG', 'none-overlay': ImageList.E4.result !== 'OK' && ImageList.E4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.E5.status" id="E5" class="fill-image" :src="ImageList.E5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> E5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="E5" @click="OpenModal" :class="{ 'green-overlay': ImageList.E5.result === 'OK', 'red-overlay': ImageList.E5.result === 'NG', 'none-overlay': ImageList.E5.result !== 'OK' && ImageList.E5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.E6.status" id="E6" class="fill-image" :src="ImageList.E6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> E6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="E6" @click="OpenModal" :class="{ 'green-overlay': ImageList.E6.result === 'OK', 'red-overlay': ImageList.E6.result === 'NG', 'none-overlay': ImageList.E6.result !== 'OK' && ImageList.E6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.E7.status" id="E7" class="fill-image" :src="ImageList.E7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> E7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="E7" @click="OpenModal" :class="{ 'green-overlay': ImageList.E7.result === 'OK', 'red-overlay': ImageList.E7.result === 'NG', 'none-overlay': ImageList.E7.result !== 'OK' && ImageList.E7.result !== 'NG' }"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.F1.status" id="F1" class="fill-image" :src="ImageList.F1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> F1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="F1" @click="OpenModal" :class="{ 'green-overlay': ImageList.F1.result === 'OK', 'red-overlay': ImageList.F1.result === 'NG', 'none-overlay': ImageList.F1.result !== 'OK' && ImageList.F1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.F2.status" id="F2" class="fill-image" :src="ImageList.F2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> F2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="F2" @click="OpenModal" :class="{ 'green-overlay': ImageList.F2.result === 'OK', 'red-overlay': ImageList.F2.result === 'NG', 'none-overlay': ImageList.F2.result !== 'OK' && ImageList.F2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.F3.status" id="F3" class="fill-image" :src="ImageList.F3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> F3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="F3" @click="OpenModal" :class="{ 'green-overlay': ImageList.F3.result === 'OK', 'red-overlay': ImageList.F3.result === 'NG', 'none-overlay': ImageList.F3.result !== 'OK' && ImageList.F3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.F4.status" id="F4" class="fill-image" :src="ImageList.F4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> F4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="F4" @click="OpenModal" :class="{ 'green-overlay': ImageList.F4.result === 'OK', 'red-overlay': ImageList.F4.result === 'NG', 'none-overlay': ImageList.F4.result !== 'OK' && ImageList.F4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.F5.status" id="F5" class="fill-image" :src="ImageList.F5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> F5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="F5" @click="OpenModal" :class="{ 'green-overlay': ImageList.F5.result === 'OK', 'red-overlay': ImageList.F5.result === 'NG', 'none-overlay': ImageList.F5.result !== 'OK' && ImageList.F5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.F6.status" id="F6" class="fill-image" :src="ImageList.F6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> F6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="F6" @click="OpenModal" :class="{ 'green-overlay': ImageList.F6.result === 'OK', 'red-overlay': ImageList.F6.result === 'NG', 'none-overlay': ImageList.F6.result !== 'OK' && ImageList.F6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.F7.status" id="F7" class="fill-image" :src="ImageList.F7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> F7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="F7" @click="OpenModal" :class="{ 'green-overlay': ImageList.F7.result === 'OK', 'red-overlay': ImageList.F7.result === 'NG', 'none-overlay': ImageList.F7.result !== 'OK' && ImageList.F7.result !== 'NG' }"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.G1.status" id="G1" class="fill-image" :src="ImageList.G1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> G1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="G1" @click="OpenModal" :class="{ 'green-overlay': ImageList.G1.result === 'OK', 'red-overlay': ImageList.G1.result === 'NG', 'none-overlay': ImageList.G1.result !== 'OK' && ImageList.G1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.G2.status" id="G2" class="fill-image" :src="ImageList.G2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> G2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="G2" @click="OpenModal" :class="{ 'green-overlay': ImageList.G2.result === 'OK', 'red-overlay': ImageList.G2.result === 'NG', 'none-overlay': ImageList.G2.result !== 'OK' && ImageList.G2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.G3.status" id="G3" class="fill-image" :src="ImageList.G3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> G3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="G3" @click="OpenModal" :class="{ 'green-overlay': ImageList.G3.result === 'OK', 'red-overlay': ImageList.G3.result === 'NG', 'none-overlay': ImageList.G3.result !== 'OK' && ImageList.G3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.G4.status" id="G4" class="fill-image" :src="ImageList.G4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> G4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="G4" @click="OpenModal" :class="{ 'green-overlay': ImageList.G4.result === 'OK', 'red-overlay': ImageList.G4.result === 'NG', 'none-overlay': ImageList.G4.result !== 'OK' && ImageList.G4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.G5.status" id="G5" class="fill-image" :src="ImageList.G5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> G5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="G5" @click="OpenModal" :class="{ 'green-overlay': ImageList.G5.result === 'OK', 'red-overlay': ImageList.G5.result === 'NG', 'none-overlay': ImageList.G5.result !== 'OK' && ImageList.G5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.G6.status" id="G6" class="fill-image" :src="ImageList.G6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> G6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="G6" @click="OpenModal" :class="{ 'green-overlay': ImageList.G6.result === 'OK', 'red-overlay': ImageList.G6.result === 'NG', 'none-overlay': ImageList.G6.result !== 'OK' && ImageList.G6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.G7.status" id="G7" class="fill-image" :src="ImageList.G7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> G7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="G7" @click="OpenModal" :class="{ 'green-overlay': ImageList.G7.result === 'OK', 'red-overlay': ImageList.G7.result === 'NG', 'none-overlay': ImageList.G7.result !== 'OK' && ImageList.G7.result !== 'NG' }"></div>
          </div>
        </div>
        <div style="display:flex; flex-direction: row; align-items: center;">
          <div class="image-container">
            <img v-if="ImageList.H1.status" id="H1" class="fill-image" :src="ImageList.H1.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> H1</div>
            <div v-if="!isModalOpen" class="background-overlay" id="H1" @click="OpenModal" :class="{ 'green-overlay': ImageList.H1.result === 'OK', 'red-overlay': ImageList.H1.result === 'NG', 'none-overlay': ImageList.H1.result !== 'OK' && ImageList.H1.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.H2.status" id="H2" class="fill-image" :src="ImageList.H2.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> H2</div>
            <div v-if="!isModalOpen" class="background-overlay" id="H2" @click="OpenModal" :class="{ 'green-overlay': ImageList.H2.result === 'OK', 'red-overlay': ImageList.H2.result === 'NG', 'none-overlay': ImageList.H2.result !== 'OK' && ImageList.H2.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.H3.status" id="H3" class="fill-image" :src="ImageList.H3.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> H3</div>
            <div v-if="!isModalOpen" class="background-overlay" id="H3" @click="OpenModal" :class="{ 'green-overlay': ImageList.H3.result === 'OK', 'red-overlay': ImageList.H3.result === 'NG', 'none-overlay': ImageList.H3.result !== 'OK' && ImageList.H3.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.H4.status" id="H4" class="fill-image" :src="ImageList.H4.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> H4</div>
            <div v-if="!isModalOpen" class="background-overlay" id="H4" @click="OpenModal" :class="{ 'green-overlay': ImageList.H4.result === 'OK', 'red-overlay': ImageList.H4.result === 'NG', 'none-overlay': ImageList.H4.result !== 'OK' && ImageList.H4.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.H5.status" id="H5" class="fill-image" :src="ImageList.H5.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> H5</div>
            <div v-if="!isModalOpen" class="background-overlay" id="H5" @click="OpenModal" :class="{ 'green-overlay': ImageList.H5.result === 'OK', 'red-overlay': ImageList.H5.result === 'NG', 'none-overlay': ImageList.H5.result !== 'OK' && ImageList.H5.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.H6.status" id="H6" class="fill-image" :src="ImageList.H6.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> H6</div>
            <div v-if="!isModalOpen" class="background-overlay" id="H6" @click="OpenModal" :class="{ 'green-overlay': ImageList.H6.result === 'OK', 'red-overlay': ImageList.H6.result === 'NG', 'none-overlay': ImageList.H6.result !== 'OK' && ImageList.H6.result !== 'NG' }"></div>
          </div>
          <div class="image-container">
            <img v-if="ImageList.H7.status" id="H7" class="fill-image" :src="ImageList.H7.imagepath" @click="OpenModal" />
            <div v-else class="blank-image"> H7</div>
            <div v-if="!isModalOpen" class="background-overlay" id="H7" @click="OpenModal" :class="{ 'green-overlay': ImageList.H7.result === 'OK', 'red-overlay': ImageList.H7.result === 'NG', 'none-overlay': ImageList.H7.result !== 'OK' && ImageList.H7.result !== 'NG' }"></div>
          </div>
        </div>
      </div>
      <!-- 겹쳐 그리기 -->
      <div v-show="isModalOpen" class="dard-footer" style="height:816px;">
        <ModalFocusedImgInterior v-if="isModalOpen" :isMaskSwitch="isMaskSwitch" :image_meta="SelectedImage"></ModalFocusedImgInterior>
      </div>

    </div>

    <!-- 팝업 모달 -->
    <!-- <div v-if="isModalOpen" class="modal-background" @click="closeModal"></div>
    <ModalFocusedImg v-if="isModalOpen" class="create-modal" @closeModal="closeModal" :image_meta="SelectedImage"></ModalFocusedImg> -->




  </div>
</template>

<script>
import ModalFocusedImgInterior from "@/components/ModalFocusedImgInterior.vue"
import axios from "axios";
import $ from 'jquery'
import FadeLoader from 'vue-spinner/src/FadeLoader.vue'

export default{
  components: {
    ModalFocusedImgInterior,
    FadeLoader
  },
  data() {
    return {
      ImageList: {
        A1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        A2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        A3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        A4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        A5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        A6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        A7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        B1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        B2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        B3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        B4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        B5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        B6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        B7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        C1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        C2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        C3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        C4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        C5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        C6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        C7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        D1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        D2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        D3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        D4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        D5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        D6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        D7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        E1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        E2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        E3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        E4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        E5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        E6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        E7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        F1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        F2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        F3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        F4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        F5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        F6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        F7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        G1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        G2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        G3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        G4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        G5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        G6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        G7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        H1: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        H2: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        H3: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        H4: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        H5: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        H6: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
        H7: { status: false, imagepath_origin: "", imagepath: "", maskpath_origin: "", maskpath: "", date: "", time: "", uncertainty: "", result: null},
      },

      Summary_TestInfo: {
        serialNo: "-",
        date: "-",
        time: "-",
        uncertainty: "-",
        result: "-",
      },

      Summary_ModelInfo: {
        id: 0,
        name: "-",
        description: "-",
        create_user_name: "-",
        val_score: 0,
      },

      config : null,
      showModel : false,

      SelectedImage: null,

      // flag_IntervalAPILoadData : false,
      // IntervalAPILoadData : null,

      status_application: null, // "ready", "running"
      flag_IntervalAPIGetStatus : false,
      IntervalAPIGetStatus : null,

      isModalOpen: false,
      isMaskSwitch: true,
    }
  },
  methods: {
    openModelInfo() {
      this.showModel = !this.showModel;
    },
    // SSE
    setupEventSource() {
      const eventSource = new EventSource(this.config.stream_latest_image + this.$store.state.project.id); // 서버의 SSE 엔드포인트로 연결합니다.

      eventSource.onopen = (event) => {
        console.log('SSE 연결이 열렸습니다.');
        console.log(event)
      };

      eventSource.onmessage = (event) => {
        console.log(event)
        var validJSONstring = event.data.replace(/'/g, '"');
        validJSONstring = validJSONstring.replace(/None/g, 'null');
        const data = JSON.parse(validJSONstring); // 받은 데이터를 JSON 형태로 파싱합니다.
        this.update_section(data);
      };

      eventSource.onerror = (event) => {
        console.error('SSE 연결 중 오류가 발생했습니다.');
        console.log(event)
        eventSource.close(); // 오류 발생 시 SSE 연결을 종료합니다.
      };
    },

    // 임시
    Set_Interval_getstatus() {
      let period = this.config.monitoring_API_period_get_status
      if(!this.flag_IntervalAPIGetStatus) {
        this.IntervalAPIGetStatus = setInterval(this.get_statusApplication, period)
        this.flag_IntervalAPIGetStatus = true
        console.log("Set Periodically API Monitoring Start")
      }
    },

    // Cycle
    // Set_Interval_LoadData () {
    //   let period = this.config.monitoring_API_period
    //   if(!this.flag_IntervalAPILoadData) {
    //       this.IntervalAPILoadData = setInterval(this.load_data, period)
    //       this.flag_IntervalAPILoadData = true
    //       console.log("Set Periodically API Monitoring Start")
    //     }
    // },
    // Clear_Interval_LoadData () {
    //   if (this.flag_IntervalAPILoadData) {
    //     clearInterval(this.IntervalAPILoadData)
    //     this.flag_IntervalAPILoadData = false
    //     console.log("Clear Periodically API Monitoring ")
    //   }
    // },

    get_statusApplication() {
      $.ajax({
          url: this.config.get_application_status + this.$store.state.project.id,
          method: "GET",
          dataType: "json",
          error: jqXHR => {
            if (jqXHR.status == 500) {
              if(this.status_application != "busy") {
                this.status_application = "ready"
              }
              console.log(jqXHR.status, this.status_application)
            }
          }
        })
        .then((data, textStatus, jqXHR) => {
          if(jqXHR.status == 200) {

            this.status_application = "running"


            console.log(jqXHR.status, this.status_application)
          }
        })
    },
    load_data() {
      $.ajax({
          url: this.config.get_latest_image + this.$store.state.project.id,
          method: "GET",
          dataType: "json",
        })
        .then((data) => {
          this.update_section(data)
        })
    },

    initialize() {
      for(let key in this.ImageList) {
        this.ImageList[key].status = false
        this.ImageList[key].imagepath_origin = ""
        this.ImageList[key].imagepath = ""
        this.ImageList[key].maskpath_origin = ""
        this.ImageList[key].maskpath = ""
        this.ImageList[key].result = null
      }
    },
    update_section(data) {
      if(this.isModalOpen == false) {
        this.Summary_TestInfo.date = data.date
        this.Summary_TestInfo.time = data.time
        this.Summary_TestInfo.uncertainty = data.uncertainty == null ? "-" : data.uncertainty
        this.Summary_TestInfo.result = data.result == null ? "-" : data.result
      }


      let section_id_front = this.set_section(data)
      if(section_id_front == "A1") {
        this.initialize()
      }
      this.ImageList[section_id_front].imagepath_origin = data.image_path
      this.ImageList[section_id_front].imagepath = "../project/" +data.image_path.split('/').slice(3).join('/')
      this.ImageList[section_id_front].maskpath_origin = data.mask_path
      this.ImageList[section_id_front].maskpath = data.mask_path != null ? data.mask_path.split('/').slice(3).join('/') : null
      this.ImageList[section_id_front].date = data.date
      this.ImageList[section_id_front].time = data.time
      this.ImageList[section_id_front].uncertainty = data.uncertainty == null ? "-" : data.uncertainty
      this.ImageList[section_id_front].result = data.result == null ? "-" : data.result
      this.ImageList[section_id_front].status = true

      // Test
      // this.ImageList[section_id_front].imagepath_origin = '/testimage/TestSample1-1.jpg'
      // this.ImageList[section_id_front].imagepath = '/testimage/TestSample1-1.jpg'
      // this.ImageList[section_id_front].maskpath_origin = '/testimage/TestMask1-1.jpg'
      // this.ImageList[section_id_front].maskpath = '/testimage/TestMask1-1.jpg'
      // this.ImageList[section_id_front].result = "NG"
      // this.ImageList[section_id_front].status = true


    },
    set_section(data) {
      var row_num = Math.floor( (parseInt(data.section_id)-1) / 7)
      var col_num = parseInt(data.section_id) % 7

      let section_first = ''
      let section_second = ''
      switch (row_num) {
        case 0: section_first='A'; break;
        case 1: section_first='B'; break;
        case 2: section_first='C'; break;
        case 3: section_first='D'; break;
        case 4: section_first='E'; break;
        case 5: section_first='F'; break;
        case 6: section_first='G'; break;
        case 7: section_first='H'; break;
        default: alert('No Section : ' + data.section_id); break;
      }
      switch (col_num) {
        case 1: section_second='1'; break;
        case 2: section_second='2'; break;
        case 3: section_second='3'; break;
        case 4: section_second='4'; break;
        case 5: section_second='5'; break;
        case 6: section_second='6'; break;
        case 0: section_second='7'; break;
        default: alert('No Section : ' + data.section_id); break;
      }
      return section_first+section_second

    },

    getLatestImageSection() {
      let section_first = ""
      let section_second = ""
      let latestkey_next = ""
      for(let key in this.ImageList) {
        console.log("key: ",key, "   status: ", this.ImageList[key].status)
        if(this.ImageList[key].status == false) {
          latestkey_next = key;
          break
        }
      }
      console.log("latestkey_next: ", latestkey_next)

      if(latestkey_next == "A1") {
        console.log("Here1")
        return null
      }
      else if(latestkey_next[1] > 1) {
        console.log("Here2")
        section_first = latestkey_next[0]
        section_second = latestkey_next[1] - 1
        return section_first+section_second
      }
      else if(latestkey_next[1] == 1) {
        console.log("Here3")
        let asciiCode = latestkey_next[0].charCodeAt(0);  // ASCII 코드 값
        let newAsciiCode = asciiCode - 1;       // 3을 뺍니다.
        section_first = String.fromCharCode(newAsciiCode);

        section_second = '7'
        return section_first+section_second
      }
      else {
        console.log("Here4")
        return "H7"
      }

    },

    SwitchMonitorChange() {
      // 여기서 스위치의 상태에 따른 동작을 수행합니다.
      console.log(this.monitorSwitch)
      if (this.monitorSwitch) {
        this.Set_Interval_LoadData()
      } else {
        this.Clear_Interval_LoadData()
      }
    },
    SwitchMaskChange() {
      // 여기서 스위치의 상태에 따른 동작을 수행합니다.
      if (this.isMaskSwitch) {
        console.log("On")
      } else {
        console.log("Off")
      }
    },

    OpenModal(event) {
      const clickedElementId = event.target.id;
      this.SelectedImage = this.ImageList[clickedElementId]
      // this.SelectedImage.filepath_img = this.ImageList[clickedElementId].imagepath

      this.isModalOpen = true

      this.Summary_TestInfo.date = this.SelectedImage.date
      this.Summary_TestInfo.time = this.SelectedImage.time
      this.Summary_TestInfo.uncertainty = this.SelectedImage.uncertainty
      this.Summary_TestInfo.result = this.SelectedImage.result

    },
    closeModal(){
      let sectionID = this.getLatestImageSection()
      console.log("latestkey: ", sectionID)
      if(sectionID != null) {
        this.Summary_TestInfo.date = this.ImageList[sectionID].date
        this.Summary_TestInfo.time = this.ImageList[sectionID].time
        this.Summary_TestInfo.uncertainty = this.ImageList[sectionID].uncertainty
        this.Summary_TestInfo.result = this.ImageList[sectionID].result
      }
      else {
        this.Summary_TestInfo.date = "-"
        this.Summary_TestInfo.time = "-"
        this.Summary_TestInfo.uncertainty = "-"
        this.Summary_TestInfo.result = "-"
      }

      this.isModalOpen = false;
      this.isMaskSwitch = true;
    },

    click_start() {
      let project_id = this.$store.state.project.id
      // fetch("http://183.105.120.175:30007/main_application/start/" + project_id, {
      fetch(this.config.monitoring_start + project_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then( data => {
        if(data.status == '200'){
          // console.log("검사 시작합니다!");
          this.status_application = "busy"
          // console.log(this.status_application)
          // console.log(this.monitorSwitch)
          // this.Set_Interval_LoadData()
        }
      });
    },
    click_stop() {
      let project_id = this.$store.state.project.id
      // fetch("http://183.105.120.175:30007/main_application/stop", {
      fetch(this.config.monitoring_stop + project_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then( data => {
        if(data.status == '200'){
          // console.log("검사 중지합니다.!");
          // this.status_application = "ready"
          // console.log(this.status_application)
          // console.log(this.monitorSwitch)
          // this.Clear_Interval_LoadData()
        }
      });
    },

    load_model_deployed() {
      $.ajax({
          url: this.config.get_model_deployed + this.$store.state.project.id, // 클라이언트가 HTTP 요청을 보낼 서버의 URL 주소
          method: "GET",   // HTTP 요청 메소드(GET, POST 등)
          dataType: "json", // 서버에서 보내줄 데이터의 타입
          // data: {
          //     project_id: Number(this.$store.state.project.id),
          // }
      })
      .then( data => {
        this.parse_model_deployed(data.deployed_ai_model);
      })
    },

    parse_model_deployed(data) {
      this.Summary_ModelInfo.id = data.id !== null ? String(data.id) : "-"
      this.Summary_ModelInfo.name = data.name !== "" ? data.name : "-"
      this.Summary_ModelInfo.description = data.description !== "" ? data.description : "-"
      this.Summary_ModelInfo.create_user_name = data.create_user_name !== "" ? data.create_user_name : "-"
      this.Summary_ModelInfo.val_score = data.val_score !== null ? (data.val_score * 100).toFixed(2) + "%" : "-"
    },


    set_config() {
      return axios.get('/config.json')
      .then(response => {
        this.config = response.data;
        console.log(this.config)
      })
      .catch(error => {
        console.log(error);
      });
    },


  },
  watch: {
    "status_application"(newStatus) {
      if(newStatus == "ready") {
        this.load_model_deployed()
      }
    }
  },

  created() {
    this.set_config()
    .then(() => {
      // SSE setup
      this.setupEventSource();
      // this.get_statusApplication()
      this.Set_Interval_getstatus()
      this.load_model_deployed()
    })
  },
  mounted() {

  },

}

</script>

<style>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 불투명한 배경 스타일 */
}
.create-modal {
   position: fixed;
   /* width: calc( (100% - 200px) * 0.98 ); */
   width: 90%;
   height: 85%;
   /* left: calc( 200px + (100% - 200px) * 0.01 ); */
   left: 5%;
   top: 5%;
   background-color: rgba(250,252,254,0.7);
   /* background-color: #000000; */

  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
}
.create-modal-interior {
   position: fixed;
   /* width: calc( (100% - 200px) * 0.98 ); */
   width: 90%;
   height: 85%;
   /* left: calc( 200px + (100% - 200px) * 0.01 ); */
   left: 5%;
   top: 5%;
   background-color: rgba(250,252,254,0.7);
   /* background-color: #000000; */

  border-top-right-radius: 1em;
  border-top-left-radius: 1em;
}
#btn-back {
  /* color: #2777E4; */
  color: white;

  font-family:'HermeneusOne-Regular';
  /* font-weight: bold; */
}
#btn-start {
  color: #2DCCFF;
  background-color: #F0F0F5;
  border-color: #D2E7FF;
  cursor: pointer;

  display: inline-block;
  font-weight: 900;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;

  margin: 0 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 1.0rem;

  font-family:'NotoSansKR-Light';
  font-weight: bold;
}
#btn-stop {
  color: #FF3838;
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
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 1.0rem;

  font-family:'NotoSansKR-Light';
  font-weight: bold;
}
#btn-tmp {
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
.blank-image {
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* height:96px;
  width: 114px; */
  height:102px;
  width: 122px;
  padding: 0;


  border: 1px dashed black;
}
.image-container {
  position: relative;
  height:102px;
  width: 122px;
  padding: 0;
}
.fill-image {
  position: relative;
  /* height:96px;
  width: 114px; */
  /* height:102px;
  width: 122px; */
  height:100%;
  width:100%;
  padding: 0;

  z-index: 0;
}
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: 1;
}
.none-overlay{
  background-color: rgba(0,0,0,0);
}
.green-overlay{
  background-color: green;
}
.red-overlay{
  background-color: red;
}
</style>