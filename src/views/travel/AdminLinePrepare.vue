<template>
  <div>
    <section id="wrap">
      <h1 class="userClass">线路日程信息</h1>
      <el-col :span="24" class="formSearch">
        <el-form :inline="true">
          <!--<el-form-item>-->
          <!--<span>线路日程筛选:</span>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
          <!--<el-autocomplete-->
          <!--style="width: 250px"-->
          <!--size="small"-->
          <!--v-model="userName"-->
          <!--:fetch-suggestions="querySearchAsync"-->
          <!--placeholder="请选择产品"-->
          <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
          <!--<el-select v-model="userSearchID" placeholder="请选择产品线路" size="small">-->
          <!--<el-option-->
          <!--v-for="item in adminProductLine"-->
          <!--:key="item.ts_pt_ID"-->
          <!--:label="item.ts_pt_Name"-->
          <!--:value="item.ts_pt_ID">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
          <!--<el-button type="primary" @click="search" size="small">查询</el-button>-->
          <!--</el-form-item>-->
          <el-form-item style="padding-right: 20px;float: right;">
            <el-button type="primary" @click="addAdminLinePrepare" size="small">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="adminLinePrepare"
        highlight-current-row
        v-loading="isLoading"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="主键编号:">
                <span>{{ props.row.ts_pt_ID }}</span>
              </el-form-item>
              <el-form-item label="线路编号:">
                <span>{{ props.row.ts_pt_Product_LineID }}</span>
              </el-form-item>
              <el-form-item label="自由活动标题:">
                <span>{{ props.row.ts_pt_FreeTitle }}</span>
              </el-form-item>
              <el-form-item label="自由活动介绍:">
                <span>{{ props.row.ts_pt_FreeDes }}</span>
              </el-form-item>
              <el-form-item label="自由活动图片:">
                <img v-lazy="v" alt="" v-for="v in props.row.ts_pt_FreeImage" width="100" height="100" style="margin-right: 5px">
              </el-form-item>
              <el-form-item label="行程概览:">
                <span>{{ props.row.ts_pt_TourShow }}</span>
              </el-form-item>
              <el-form-item label="温馨提示:">
                <span>{{ props.row.ts_pt_HappyNotice }}</span>
              </el-form-item>
              <el-form-item label="出发站点:">
                <span v-for="item in props.row.titleList">{{ item.ts_dtp_FromSite }} <span>[{{item.ts_dtp_GoWay | getGoWay}}]</span></span>
              </el-form-item>
              <el-form-item label="景点信息:">
                <div v-for="item in props.row.tourList">
                  <h2>{{item.ts_ts_TourName}}</h2>
                  <div style="padding-left: 20px">
                    <p>景点名称:{{item.ts_ts_TourName}}</p>
                    <p>游玩时长:{{item.ts_ts_NeedMinute}}分钟</p>
                    <p>开放时间:{{item.ts_ts_OpenTime}}</p>
                    <p>景点地址:{{item.ts_ts_Address}}</p>
                    <p>费用情况:{{item.ts_ts_Fee}}</p>
                    <p>时间:{{item.ts_ts_Time}}</p>
                    <img v-lazy="v" alt="" v-for="v in item.ts_ts_Image" width="100" height="100">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="酒店信息:">
                <div v-for="item in props.row.hotelList">
                  <h2>{{item.ts_hl_HotelName}}</h2>
                  <div style="padding-left: 20px">
                    <p>酒店名称:{{item.ts_hl_HotelName}}</p>
                    <p>酒店星级:{{item.ts_hl_Star}}分钟</p>
                    <p>参考酒店:{{item.ts_hl_LookHotel}}</p>
                    <p>酒店介绍:{{item.ts_hl_HotelDes}}</p>
                    <p>标准间:{{item.ts_hl_StandardRoom}}</p>
                    <p>床型:{{item.ts_hl_BedType}}</p>
                    <p>设施:{{item.ts_hl_Good}}</p>
                    <p>酒店地址:{{item.ts_hl_Address}}</p>
                    <p>温馨提示:{{item.ts_hl_HappyNotice}}</p>
                    <p>时间:{{item.ts_hl_Time}}</p>
                    <img v-lazy="v" alt="" v-for="v in item.ts_hl_HotelImage" width="100" height="100">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="美食信息:">
                <div v-for="item in props.row.foodList">
                  <h2>{{item.ts_fd_UseType | getUseType}}</h2>
                  <div style="padding-left: 20px">
                    <p>美食名称:{{item.ts_fd_Title}}</p>
                    <p>美食状态:{{item.ts_fd_Include}}</p>
                    <p>美食描述:{{item.ts_fd_Des}}</p>
                    <p>温馨提示:{{item.ts_fd_HappyNotice}}</p>
                    <p>用餐时间:{{item.ts_fd_Time}}</p>
                    <p>耗时:{{item.ts_fd_WasteMinute}}</p>
                    <img v-lazy="v" alt="" v-for="v in item.ts_fd_Image" width="100" height="100">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="第几天日程:">
                <span>{{ props.row.ts_pt_Day }}</span>
              </el-form-item>
              <el-form-item label="日程明细:">
                <span>{{ props.row.ts_pt_Describe }}</span>
              </el-form-item>
              <el-form-item label="活动图片地址:">
                <img v-for="item,index in props.row.ts_pt_ShowImage" :src="item" alt="" :key="index" width="300"
                     height="150" @click="$seeImage">

              </el-form-item>
              <el-form-item label="线路日程详情:">
                <div v-html="props.row.ts_pt_Content"></div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="主键编号"
          prop="ts_pt_ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="线路编号"
          align="center"
          prop="ts_pt_Product_LineID">
        </el-table-column>
        <el-table-column
          label="第几天日程"
          align="center"
          prop="ts_pt_Day">
        </el-table-column>

        <el-table-column
          align="center"
          label="备注">
          <template slot-scope="props">
            <el-popover
              ref="popover1"
              placement="top-start"
              trigger="hover"
              :content="props.row.ts_pt_Remark">
            </el-popover>
            <el-button v-popover:popover1 size="small">移入查看</el-button>
          </template>

        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updateAdminLinePrepare(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteAdminLinePrepare(scope.row.ts_pt_ID)">删除
            </el-button>

            <el-button
              type="success"
              size="mini"
              @click="jump(scope.row)">预览效果
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--添加线路日程-->
      <el-dialog title="添加线路日程" :visible.sync="addDialog" :close-on-click-modal="false"
                 @close="closeDialog" width="65%">
        <div style="margin-bottom: 30px">
          <el-button size="small" type="primary" @click="isFreeActivities=true">添加自由活动</el-button>
          <el-button size="small" type="primary" @click="isTheTravel=true">添加行程概览</el-button>
          <el-button size="small" type="primary" @click="isReminder=true">添加温馨提示</el-button>
          <el-button size="small" type="primary" @click="isFood=true">添加早中晚餐</el-button>
        </div>
        <el-form :model="addData">
          <el-form-item label="行程概览:" :label-width="formLabelWidth" style="margin: 5px 0" v-show="isTheTravel">
            <el-input type="textarea" v-model="addData.ts_pt_TourShow" placeholder="请输入行程概览" size="small"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示:" :label-width="formLabelWidth" style="margin: 5px 0" v-show="isReminder">
            <el-input type="textarea" v-model="addData.ts_pt_HappyNotice" placeholder="请输入温馨提示" size="small"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="自由活动标题:" :label-width="formLabelWidth" v-show="isFreeActivities">
            <el-input v-model="addData.ts_pt_FreeTitle" placeholder="请输入自由活动标题"></el-input>
          </el-form-item>
          <el-form-item label="自由活动介绍:" :label-width="formLabelWidth" v-show="isFreeActivities">
            <el-input v-model="addData.ts_pt_FreeDes" placeholder="请输入自由活动介绍"></el-input>
          </el-form-item>
          <el-form-item label="自由活动图片:" :label-width="formLabelWidth" required v-show="isFreeActivities">
            <p>单张图片大小不能大于600KB</p>
            <Upload @getData="getFreeData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="v,index in FreeImageURL" style="display: inline-block;position: relative;margin-right: 70px">
                <img
                  :src="v"
                  width="280"
                  height="125"
                  v-show="FreeImageURL.length"
                >
                <span style="color: #f60" @click="deleteFreeImageURL(v)">X</span>
                <em>
                  <el-radio v-model="addFreeRadioIndex" :label="index+1">替换</el-radio>
                </em>
              </p>
            </div>
          </el-form-item>
          <!--<el-form-item label="日程名称:" :label-width="formLabelWidth">-->
          <!--<el-input v-model="addData.ts_pt_Name" placeholder="请输入日程名称"></el-input>-->
          <!--</el-form-item>-->
          <!--标题-->
          <el-form-item label="添加标题个数:" :label-width="formLabelWidth">
            <el-select v-model="num" filterable placeholder="请选择" style="width: 80px;float: left;"
                       @change="changeTitle">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.id"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="clear: both"></div>
            <div v-for="item in titleJson" style="margin-top: 10px;float: left;" v-show="titleJson.length">
              <el-input v-model="item.ts_dtp_FromSite" placeholder="请输入出发站点" style="width: 125px;margin-left: 10px"
                        size="small"></el-input>
              <el-select v-model="item.ts_dtp_GoWay" placeholder="交通工具" style="width: 100px" size="small">
                <el-option
                  v-for="item in GoWayList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div style="margin-top: 10px;float: left;margin-left: 10px" v-show="titleJson.length">
              <el-input v-model="ReachSite" placeholder="请输入到达站点" style="width: 120px;float: left;"
                        size="small"></el-input>
            </div>
          </el-form-item>

          <!--添加景点-->
          <el-form-item label="添加景点个数:" :label-width="formLabelWidth">
            <el-select v-model="tourNum" filterable placeholder="请选择" style="width: 80px;float: left;"
                       @change="changeTourSite">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.id"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="clear: both"></div>
            <div v-for="item,index in tourSiteJson">
              <h2>景点{{index+1}}</h2>
              <el-form-item label="景点名称:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_ts_TourName" placeholder="请输入景点名称" size="small"></el-input>
              </el-form-item>
              <el-form-item label="时间:" :label-width="formLabelWidth">
                <el-time-select
                  size="small"
                  v-model="item.ts_ts_Time"
                  :picker-options="{
                        start: '05:00',
                        step: '00:30',
                        end: '20:00'
                      }"
                  placeholder="选择时间">
                </el-time-select>
                <!--<el-input v-model="item.ts_ts_Time" placeholder="请输入时间" size="small"></el-input>-->
              </el-form-item>
              <el-form-item label="游玩时长:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_ts_NeedMinute" placeholder="请输入游玩时长" size="small"></el-input>
              </el-form-item>
              <el-form-item label="开放时间:" :label-width="formLabelWidth" style="margin: 5px 0">
                <el-input type="textarea" v-model="item.ts_ts_OpenTime" placeholder="请输入开放时间" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>
              <el-form-item label="景点地址:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_ts_Address" placeholder="请输入景点地址" size="small"></el-input>
              </el-form-item>
              <el-form-item label="费用情况:" :label-width="formLabelWidth" style="margin: 5px 0">
                <el-select v-model="item.ts_ts_Fee" placeholder="请选择" size="small">
                  <el-option
                    label="自费"
                    value="自费">
                  </el-option>
                  <el-option
                    label="免费"
                    value="免费">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="景点图片:" :label-width="formLabelWidth" required>
                <p>单张图片大小不能大于600KB</p>
                <Upload @getData="getData" :attrs="imageObj" :index="index"></Upload>
                <div class="imgWap">
                  <p v-for="v in item.ImageURL" style="display: inline-block;position: relative;margin-right: 70px">
                    <img
                      :src="v"
                      width="280"
                      height="125"
                      v-show="item.ImageURL.length"
                    >
                    <span style="color: #f60" @click="deleteImageURL(v,index)">X</span>
                    <em>
                      <el-radio v-model="addRadioIndex" :label="index+1">替换</el-radio>
                    </em>
                  </p>
                </div>
              </el-form-item>
              <el-form-item label="景区简介:" :label-width="formLabelWidth" style="margin: 15px 0">
                <el-input type="textarea" v-model="item.ts_ts_Des" placeholder="请输入景区简介" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>
            </div>
          </el-form-item>

          <!--添加酒店-->
          <el-form-item label="添加酒店个数:" :label-width="formLabelWidth">
            <el-select v-model="hotelNum" filterable placeholder="请选择" style="width: 80px;float: left;"
                       @change="changeHotel">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.id"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="clear: both"></div>

            <div v-for="item,index in hotelJson">
              <h2>酒店{{index+1}}</h2>
              <el-form-item label="酒店名称:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_HotelName" placeholder="请输入酒店名称" size="small"></el-input>
              </el-form-item>
              <el-form-item label="时间:" :label-width="formLabelWidth" style="margin: 5px 0">
                <el-time-select
                  size="small"
                  v-model="item.ts_hl_Time"
                  :picker-options="{
                        start: '05:00',
                        step: '00:30',
                        end: '20:00'
                      }"
                  placeholder="选择时间">
                </el-time-select>
                <!--<el-input v-model="item.ts_hl_Time" placeholder="请输入时间" size="small"></el-input>-->
              </el-form-item>
              <el-form-item label="酒店星级:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_Star" placeholder="请输入酒店星级" size="small"></el-input>
              </el-form-item>
              <el-form-item label="参考酒店:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_LookHotel" placeholder="请输入参考酒店" size="small"></el-input>
              </el-form-item>
              <el-form-item label="标准间:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_StandardRoom" placeholder="请输入标准间" size="small"></el-input>
              </el-form-item>
              <el-form-item label="床型:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_BedType" placeholder="请输入床型" size="small"></el-input>
              </el-form-item>
              <el-form-item label="设施:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_Good" placeholder="请输入设施" size="small"></el-input>
              </el-form-item>
              <el-form-item label="酒店地址:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_Address" placeholder="请输入酒店地址" size="small"></el-input>
              </el-form-item>
              <el-form-item label="温馨提示:" :label-width="formLabelWidth" style="margin-top: 5px">
                <el-input type="textarea" v-model="item.ts_hl_HappyNotice" placeholder="请输入温馨提示" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>
              <el-form-item label="酒店介绍:" :label-width="formLabelWidth" style="margin-top: 10px">
                <el-input type="textarea" v-model="item.ts_hl_HotelDes" placeholder="请输入酒店介绍" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>

              <el-form-item label="酒店图片:" :label-width="formLabelWidth" required>
                <p>单张图片大小不能大于600KB</p>
                <Upload @getData="getHotelData" :attrs="imageObj" :index="index"></Upload>
                <div class="imgWap">
                  <p v-for="v in item.ImageURL" style="display: inline-block;position: relative;margin-right: 70px">
                    <img
                      :src="v"
                      width="280"
                      height="125"
                      v-show="item.ImageURL.length"
                    >
                    <span style="color: #f60" @click="deleteHotelImageURL(v,index)">X</span>
                    <em>
                      <el-radio v-model="addHotelRadioIndex" :label="index+1">替换</el-radio>
                    </em>
                  </p>
                </div>
              </el-form-item>
            </div>

          </el-form-item>

          <!--添加早中晚-->
          <el-form-item :label="'添加'+item.ts_fd_UseName+':'" :label-width="formLabelWidth"
                        v-for="item,index in foodJson" :key="index" v-show="isFood">
            <el-input v-model="item.ts_fd_Title" placeholder="请输入标题" size="small"></el-input>
            <el-select v-model="item.ts_fd_Include" placeholder="请选择美食状态" size="small">
              <el-option
                label="个人自理"
                value="个人自理">
              </el-option>
              <el-option
                label="已含"
                value="已含">
              </el-option>
            </el-select>
            <el-input type="textarea" v-model="item.ts_fd_Des" placeholder="请输入美食描述" size="small"
                      :autosize="{ minRows: 4, maxRows: 6}" style="margin: 5px 0"></el-input>
            <el-input type="textarea" v-model="item.ts_fd_HappyNotice" placeholder="请输入温馨提示" size="small"
                      :autosize="{ minRows: 4, maxRows: 6}" style="margin: 5px 0"></el-input>
            <!--<el-input v-model="item.ts_fd_Time" placeholder="请输入用餐时间" size="small"></el-input>-->

            <el-time-select
              size="small"
              v-model="item.ts_fd_Time"
              :picker-options="{
                        start: '05:00',
                        step: '00:30',
                        end: '20:00'
                      }"
              placeholder="选择时间">
            </el-time-select>

            <el-input v-model="item.ts_fd_WasteMinute" placeholder="请输入耗时" size="small"></el-input>

            <p>美食单张图片大小不能大于600KB</p>
            <Upload @getData="getFoodData" :attrs="imageObj" :index="index"></Upload>
            <div class="imgWap">
              <p v-for="v in item.ImageURL" style="display: inline-block;position: relative;margin-right: 70px">
                <img
                  :src="v"
                  width="280"
                  height="125"
                  v-show="item.ImageURL.length"
                >
                <span style="color: #f60" @click="deleteFoodImageURL(v,index)">X</span>
                <em>
                  <el-radio v-model="addFoodRadioIndex" :label="index+1">替换</el-radio>
                </em>
              </p>
            </div>

          </el-form-item>

          <el-form-item label="第几天行程:" :label-width="formLabelWidth">
            <el-input v-model="addData.ts_pt_Day" placeholder="请输入第几天行程"></el-input>
          </el-form-item>
          <el-form-item label="日程明细:" :label-width="formLabelWidth">
            <el-input v-model="addData.ts_pt_Describe" placeholder="请输入日程明细" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="addData.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="cacheForm">取 消</el-button>-->
          <el-button @click=" addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>


      <!--修改线路日程-->
      <el-dialog title="修改线路日程" :visible.sync="updateAdminLinePrepareDialog" :close-on-click-modal="false"
                 @close="closeDialog" width="1150px">
        <el-form :model="updateAdminLinePrepareObj">

          <el-form-item label="行程概览:" :label-width="formLabelWidth" style="margin: 5px 0">
            <el-input type="textarea" v-model="updateAdminLinePrepareObj.ts_pt_TourShow" placeholder="请输入行程概览"
                      size="small"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="温馨提示:" :label-width="formLabelWidth" style="margin: 5px 0">
            <el-input type="textarea" v-model="updateAdminLinePrepareObj.ts_pt_HappyNotice" placeholder="请输入温馨提示"
                      size="small"
                      :autosize="{ minRows: 4, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="自由活动标题:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_FreeTitle" placeholder="请输入自由活动标题"></el-input>
          </el-form-item>
          <el-form-item label="自由活动介绍:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_FreeDes" placeholder="请输入自由活动介绍"></el-input>
          </el-form-item>
          <el-form-item label="自由活动图片:" :label-width="formLabelWidth" required >
            <p>单张图片大小不能大于600KB</p>
            <Upload @getData="getUpdateFreeData" :attrs="imageObj"></Upload>
            <div class="imgWap">
              <p v-for="v,index in updateAdminLinePrepareObj.ts_pt_FreeImage" style="display: inline-block;position: relative;margin-right: 70px">
                <img
                  :src="v"
                  width="280"
                  height="125"
                  v-show="updateAdminLinePrepareObj.ts_pt_FreeImage.length"
                >
                <span style="color: #f60" @click="deleteUpdateFreeImageURL(v,index)">X</span>
                <em>
                  <el-radio v-model="addUpdateFreeRadioIndex" :label="index+1">替换</el-radio>
                </em>
              </p>
            </div>
          </el-form-item>

          <!--标题-->
          <el-form-item label="标题:" :label-width="formLabelWidth">
            <el-select v-model="updateNum" filterable placeholder="请选择" style="width: 80px;float: left;"
                       @change="changeUpdateTitle">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.id"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="clear: both"></div>
            <div v-for="item in updateAdminLinePrepareObj.titleList" style="margin-top: 10px;float: left;">
              <el-input v-model="item.ts_dtp_FromSite" placeholder="请输入出发站点" style="width: 125px;margin-left: 10px"
                        size="small" v-show="item.ts_dtp_GoWay!=100"></el-input>
              <el-select v-model="item.ts_dtp_GoWay" placeholder="交通工具" style="width: 100px" size="small" v-show="item.ts_dtp_GoWay!=100">
                <el-option
                  v-for="item in GoWayList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="item.ts_dtp_FromSite" placeholder="请输入到达站点" style="width: 120px;float: left;"
                        size="small"  v-show="item.ts_dtp_GoWay==100"></el-input>
            </div>
            <!--<div style="margin-top: 10px;float: left;margin-left: 10px">-->
             <!---->
            <!--</div>-->
          </el-form-item>

          <!--修改早中晚-->
          <el-form-item label="修改早中晚:" :label-width="formLabelWidth">
            <br>
           <div v-for="item,index in updateAdminLinePrepareObj.foodList">
             <h2>{{item.ts_fd_UseType | getUseType}}</h2>
             <el-form-item label="标题:" :label-width="formLabelWidth">
               <el-input v-model="item.ts_fd_Title" placeholder="请输入标题" size="small"></el-input>
             </el-form-item>
             <el-form-item label="美食状态:" :label-width="formLabelWidth">
               <el-select v-model="item.ts_fd_Include" placeholder="请选择美食状态" size="small">
                 <el-option
                   label="个人自理"
                   value="个人自理">
                 </el-option>
                 <el-option
                   label="已含"
                   value="已含">
                 </el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="美食描述:" :label-width="formLabelWidth">
               <el-input type="textarea" v-model="item.ts_fd_Des" placeholder="请输入美食描述" size="small"
                         :autosize="{ minRows: 4, maxRows: 6}" style="margin: 5px 0"></el-input>
             </el-form-item>
             <el-form-item label="温馨提示:" :label-width="formLabelWidth">
               <el-input type="textarea" v-model="item.ts_fd_HappyNotice" placeholder="请输入温馨提示" size="small"
                         :autosize="{ minRows: 4, maxRows: 6}" style="margin: 5px 0"></el-input>
             </el-form-item>
             <el-form-item label="时间:" :label-width="formLabelWidth">
               <el-time-select
                 size="small"
                 v-model="item.ts_fd_Time"
                 :picker-options="{
                        start: '05:00',
                        step: '00:30',
                        end: '20:00'
                      }"
                 placeholder="选择时间">
               </el-time-select>
             </el-form-item>
             <el-form-item label="耗时:" :label-width="formLabelWidth">
               <el-input v-model="item.ts_fd_WasteMinute" placeholder="请输入耗时" size="small"></el-input>
             </el-form-item>
             <el-form-item label="美食图片:" :label-width="formLabelWidth">
               <p>美食单张图片大小不能大于600KB</p>
               <Upload @getData="getUpdateFoodData" :attrs="imageObj" :index="index"></Upload>
               <div class="imgWap">
                 <p v-for="v in item.ts_fd_Image" style="display: inline-block;position: relative;margin-right: 70px">
                   <img
                     :src="v"
                     width="280"
                     height="125"
                     v-show="item.ts_fd_Image.length"
                   >
                   <span style="color: #f60" @click="deleteUpdateFoodImageURL(v,index)">X</span>
                   <em>
                     <el-radio v-model="addUpdateFoodRadioIndex" :label="index+1">替换</el-radio>
                   </em>
                 </p>
               </div>
             </el-form-item>
           </div>

          </el-form-item>

          <!--修改景点-->
          <el-form-item label="修改景点个数:" :label-width="formLabelWidth">
            <el-select v-model="tourUpdateNum" filterable placeholder="请选择" style="width: 80px;float: left;"
                       @change="changeUpdateTourSite">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.id"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="clear: both"></div>
            <div v-for="item,index in updateAdminLinePrepareObj.tourList" v-show="updateAdminLinePrepareObj.tourList.length">
              <h2>景点{{index+1}}</h2>
              <el-form-item label="景点名称:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_ts_TourName" placeholder="请输入景点名称" size="small"></el-input>
              </el-form-item>
              <el-form-item label="时间:" :label-width="formLabelWidth">
                <el-time-select
                  size="small"
                  v-model="item.ts_ts_Time"
                  :picker-options="{
                        start: '05:00',
                        step: '00:30',
                        end: '20:00'
                      }"
                  placeholder="选择时间">
                </el-time-select>
                <!--<el-input v-model="item.ts_ts_Time" placeholder="请输入时间" size="small"></el-input>-->
              </el-form-item>
              <el-form-item label="游玩时长:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_ts_NeedMinute" placeholder="请输入游玩时长" size="small"></el-input>
              </el-form-item>
              <el-form-item label="开放时间:" :label-width="formLabelWidth" style="margin: 5px 0">
                <el-input type="textarea" v-model="item.ts_ts_OpenTime" placeholder="请输入开放时间" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>
              <el-form-item label="景点地址:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_ts_Address" placeholder="请输入景点地址" size="small"></el-input>
              </el-form-item>
              <el-form-item label="费用情况:" :label-width="formLabelWidth" style="margin: 5px 0">
                <el-select v-model="item.ts_ts_Fee" placeholder="请选择" size="small">
                  <el-option
                    label="自费"
                    value="自费">
                  </el-option>
                  <el-option
                    label="免费"
                    value="免费">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="景点图片:" :label-width="formLabelWidth" required>
                <p>单张图片大小不能大于600KB</p>
                <Upload @getData="getUpdateTourSiteData" :attrs="imageObj" :index="index"></Upload>
                <div class="imgWap">
                  <p v-for="v in item.ts_ts_Image" style="display: inline-block;position: relative;margin-right: 70px">
                    <img
                      :src="v"
                      width="280"
                      height="125"
                      v-show="item.ts_ts_Image.length"
                    >
                    <span style="color: #f60" @click="deleteUpdateTourSiteImageURL(v,index)">X</span>
                    <em>
                      <el-radio v-model="addUpdateTourSiteRadioIndex" :label="index+1">替换</el-radio>
                    </em>
                  </p>
                </div>
              </el-form-item>
              <el-form-item label="景区简介:" :label-width="formLabelWidth" style="margin: 15px 0">
                <el-input type="textarea" v-model="item.ts_ts_Des" placeholder="请输入景区简介" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>
            </div>
          </el-form-item>

          <!--修改酒店-->
          <el-form-item label="修改酒店个数:" :label-width="formLabelWidth">
            <el-select v-model="hotelUpdateNum" filterable placeholder="请选择" style="width: 80px;float: left;"
                       @change="changeUpdateHotel">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.id"
                :value="item.value">
              </el-option>
            </el-select>
            <div style="clear: both"></div>

            <div v-for="item,index in updateAdminLinePrepareObj.hotelList" v-show="updateAdminLinePrepareObj.hotelList.length">
              <h2>{{item.ts_hl_HotelName}}</h2>
              <el-form-item label="酒店名称:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_HotelName" placeholder="请输入酒店名称" size="small"></el-input>
              </el-form-item>
              <el-form-item label="时间:" :label-width="formLabelWidth" style="margin: 5px 0">
                <el-time-select
                  size="small"
                  v-model="item.ts_hl_Time"
                  :picker-options="{
                        start: '05:00',
                        step: '00:30',
                        end: '20:00'
                      }"
                  placeholder="选择时间">
                </el-time-select>
                <!--<el-input v-model="item.ts_hl_Time" placeholder="请输入时间" size="small"></el-input>-->
              </el-form-item>
              <el-form-item label="酒店星级:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_Star" placeholder="请输入酒店星级" size="small"></el-input>
              </el-form-item>
              <el-form-item label="参考酒店:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_LookHotel" placeholder="请输入参考酒店" size="small"></el-input>
              </el-form-item>
              <el-form-item label="标准间:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_StandardRoom" placeholder="请输入标准间" size="small"></el-input>
              </el-form-item>
              <el-form-item label="床型:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_BedType" placeholder="请输入床型" size="small"></el-input>
              </el-form-item>
              <el-form-item label="设施:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_Good" placeholder="请输入设施" size="small"></el-input>
              </el-form-item>
              <el-form-item label="酒店地址:" :label-width="formLabelWidth">
                <el-input v-model="item.ts_hl_Address" placeholder="请输入酒店地址" size="small"></el-input>
              </el-form-item>
              <el-form-item label="温馨提示:" :label-width="formLabelWidth" style="margin-top: 5px">
                <el-input type="textarea" v-model="item.ts_hl_HappyNotice" placeholder="请输入温馨提示" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>
              <el-form-item label="酒店介绍:" :label-width="formLabelWidth" style="margin-top: 10px">
                <el-input type="textarea" v-model="item.ts_hl_HotelDes" placeholder="请输入酒店介绍" size="small"
                          :autosize="{ minRows: 4, maxRows: 6}"></el-input>
              </el-form-item>

              <el-form-item label="酒店图片:" :label-width="formLabelWidth" required>
                <p>单张图片大小不能大于600KB</p>
                <Upload @getData="getUpdateHotelData" :attrs="imageObj" :index="index"></Upload>
                <div class="imgWap">
                  <p v-for="v in item.ts_hl_HotelImage" style="display: inline-block;position: relative;margin-right: 70px">
                    <img
                      :src="v"
                      width="280"
                      height="125"
                      v-show="item.ts_hl_HotelImage.length"
                    >
                    <span style="color: #f60" @click="deleteUpdateHotelImageURL(v,index)">X</span>
                    <em>
                      <el-radio v-model="addUpdateHotelRadioIndex" :label="index+1">替换</el-radio>
                    </em>
                  </p>
                </div>
              </el-form-item>
            </div>

          </el-form-item>


          <!--<el-form-item label="日程名称:" :label-width="formLabelWidth">-->
            <!--<el-input v-model="updateAdminLinePrepareObj.ts_pt_Name" placeholder="请输入日程名称"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="第几天行程:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Day" placeholder="请输入第几天行程"></el-input>
          </el-form-item>
          <el-form-item label="日程明细:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Describe" placeholder="请输入日程明细" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
          <!--<el-form-item label="线路日程详情:" :label-width="formLabelWidth">-->
            <!--<editor v-model="updateAdminLinePrepareObj.ts_pt_Content" ref="editor"></editor>-->
            <!--&lt;!&ndash;<tinymce :height="1000" v-model="updateAdminLinePrepareObj.ts_pt_Content"></tinymce>&ndash;&gt;-->
          <!--</el-form-item>-->
          <!--<el-form-item label="展示图片:" :label-width="formLabelWidth">-->
            <!--<p>单张图片大小不能大于600KB</p>-->
            <!--<Upload @getData="updateImage" :attrs="imageObj"></Upload>-->

            <!--<div class="imgWap">-->
              <!--<p v-for="item,index in updateImageURL"-->
                 <!--style="display: inline-block;position: relative;margin-right: 70px">-->
                <!--<span style="color: #f60" @click="deleteUpdateImageURL(item)">X</span>-->
                <!--<em>-->
                  <!--<el-radio v-model="radioIndex" :label="index+1">替换</el-radio>-->
                <!--</em>-->
                <!--<img-->
                  <!--:src="item"-->
                  <!--width="280"-->
                  <!--height="125"-->
                  <!--v-show="updateImageURL.length"-->
                <!--&gt;-->
              <!--</p>-->
            <!--</div>-->
          <!--</el-form-item>-->
          <el-form-item label="备注:" :label-width="formLabelWidth">
            <el-input v-model="updateAdminLinePrepareObj.ts_pt_Remark" placeholder="请输入内容" type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!--<el-button @click="cacheForm">取 消</el-button>-->
          <el-button @click="updateAdminLinePrepareDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAdminLinePrepareSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr, getEscapeVal, goEscapeVal} from '@/assets/js/public'
  // import Tinymce from '@/components/NewTinymce'
  import Editor from '@/components/Editor'
  import Upload from '@/components/Upload'

  export default {
    name: '',
    props: ['id'],
    components: {
      // Tinymce,
      Upload,
      Editor
    },
    data() {
      return {
        addUpdateFreeRadioIndex:0,
        addUpdateTourSiteRadioIndex:0,
        addUpdateHotelRadioIndex:0,
        addUpdateFoodRadioIndex:0,
        tourUpdateNum:0,
        hotelUpdateNum:0,
        updateNum:0,//修改标题num
        isFood: false,
        isFreeActivities: false,
        isReminder: false,//温馨提示
        "foodJson": [{
          "ts_fd_Title": "",
          ImageURL: [],
          "ts_fd_UseType": 0,//0早餐 1中餐  2晚餐
          "ts_fd_UseName": '早餐',//0早餐 1中餐  2晚餐
          "ts_fd_Include": "",//0个人自理  1已含
          "ts_fd_Des": "",//美食描述 富文本格式
          "ts_fd_Image": "",//美食图片
          "ts_fd_HappyNotice": "",//温馨提示  富文本格式
          "ts_fd_Time": "",//用餐时间  格式HH:mm
          "ts_fd_WasteMinute": '',//耗时
        }, {
          "ts_fd_Title": "",
          ImageURL: [],
          "ts_fd_UseType": 1,//0早餐 1中餐  2晚餐
          "ts_fd_UseName": '中餐',//0早餐 1中餐  2晚餐
          "ts_fd_Include": "",//0个人自理  1已含
          "ts_fd_Des": "",//美食描述 富文本格式
          "ts_fd_Image": "",//美食图片
          "ts_fd_HappyNotice": "",//温馨提示  富文本格式
          "ts_fd_Time": "",//用餐时间  格式HH:mm
          "ts_fd_WasteMinute": '',//耗时
        }, {
          "ts_fd_Title": "",
          ImageURL: [],
          "ts_fd_UseType": 2,//0早餐 1中餐  2晚餐
          "ts_fd_UseName": '晚餐',//0早餐 1中餐  2晚餐
          "ts_fd_Include": "",//0个人自理  1已含
          "ts_fd_Des": "",//美食描述 富文本格式
          "ts_fd_Image": "",//美食图片
          "ts_fd_HappyNotice": "",//温馨提示  富文本格式
          "ts_fd_Time": "",//用餐时间  格式HH:mm
          "ts_fd_WasteMinute": '',//耗时
        }],
        "hotelJson": [],
        ReachSite: '',//到达站点
        //出行交通工具
        GoWayList: [
          {
            name: '汽车',
            value: 0
          },
          {
            name: '火车',
            value: 1
          },
          {
            name: '飞机',
            value: 2
          },
          {
            name: '轮船',
            value: 3
          }
        ],
        "titleJson": [],
        imageObj: {accept: 'image/*'},
        radioIndex: '',
        updateImageURL: [],
        addRadioIndex: 0,
        addHotelRadioIndex: 0,
        addFreeRadioIndex: 0,
        FreeImageURL: [],
        addFoodRadioIndex: 0,
        isUploaNode: true,
        isFoodUploaNode: true,
        options: [],
        num: 0,
        tourNum: 0,
        hotelNum: 0,
        updateActivityContentObj: {},
        addActivityContentDialog: false,
        updateActivityContentDialog: false,
        activityContent: '',
        GoodId: '',
        LineID: '',
        userName: '',
        isTheTravel: false,
        ImageURL: [],
        ImageURL2: [],
        isLoading: false,
        userSearchID: '',
        formLabelWidth: '120px',
        addDialog: false,
        updateAdminLinePrepareDialog: false,
        updateAdminLinePrepareObj: {},
        imageObj: {accept: 'image/*'},
        addRadioIndex: 0,
        addActiveIndex: 0,
        updateActiveIndex: 0,
        addData: {
          "ts_pt_Name": "",
          "ts_pt_Product_LineID": "",//线路编码
          "ts_pt_Content": "",//富文本格式
          "ts_pt_ShowImage": "",//活动图片
          "ts_pt_Day": '',//第几天行程
          "ts_pt_Remark": "",
          'ts_pt_Describe': '',
          "ts_pt_FreeTitle": "",//自由活动标题
          "ts_pt_FreeDes": "",//自由活动介绍
          "ts_pt_FreeImage": "",//自由活动图片
          "ts_pt_TourShow": "",//行程概览
          "ts_pt_HappyNotice": "",//温馨提示
        },
        addOptions: {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "token": "",
          "data": {},
          titleJson: [],
          tourSiteJson: [],
          foodJson: [],
          hotelJson: []
        },
        "tourSiteJson": []
      }
    },
    computed: mapGetters([
      'adminTradeGoodList',
      'adminProductLine',
      'adminQueryProductList',
      'adminLinePrepare',
    ]),
    methods: {
      //修改自由活动图片获取地址
      getUpdateFreeData(data){
        if (!this.addUpdateFreeRadioIndex) {
          this.updateAdminLinePrepareObj.ts_pt_FreeImage.push(data.data);
        } else {
          this.updateAdminLinePrepareObj.ts_pt_FreeImage.splice(this.radioIndex - 1, 1, data.data);
          this.addUpdateFreeRadioIndex = '';
        }
      },
      //删除图片修改自由活动
      deleteUpdateFreeImageURL(val,index){
        this.updateAdminLinePrepareObj.ts_pt_FreeImage = this.updateAdminLinePrepareObj.ts_pt_FreeImage.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //修改酒店图片获取地址
      getUpdateHotelData(data){
        if (!this.addUpdateHotelRadioIndex) {
          this.updateAdminLinePrepareObj.hotelList[data.index].ts_hl_HotelImage.push(data.data);
        } else {
          this.updateAdminLinePrepareObj.hotelList[data.index].ts_hl_HotelImage.splice(this.radioIndex - 1, 1, data.data);
          this.addUpdateHotelRadioIndex = '';
        }
      },
      //删除图片修改酒店
      deleteUpdateHotelImageURL(val,index){
        this.updateAdminLinePrepareObj.hotelList[index].ts_hl_HotelImage = this.updateAdminLinePrepareObj.hotelList[index].ts_hl_HotelImage.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //修改景点图片获取地址
      getUpdateTourSiteData(data){
        if (!this.addUpdateTourSiteRadioIndex) {
          this.updateAdminLinePrepareObj.tourList[data.index].ts_ts_Image.push(data.data);
        } else {
          this.updateAdminLinePrepareObj.tourList[data.index].ts_ts_Image.splice(this.radioIndex - 1, 1, data.data);
          this.addUpdateTourSiteRadioIndex = '';
        }
      },
      //删除图片修改景点
      deleteUpdateTourSiteImageURL(val,index){
        this.updateAdminLinePrepareObj.tourList[index].ts_ts_Image = this.updateAdminLinePrepareObj.tourList[index].ts_ts_Image.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //修改早中晚图片获取地址
      getUpdateFoodData(data){
        if (!this.addUpdateFoodRadioIndex) {
          this.updateAdminLinePrepareObj.foodList[data.index].ts_fd_Image.push(data.data);
        } else {
          this.updateAdminLinePrepareObj.foodList[data.index].ts_fd_Image.splice(this.radioIndex - 1, 1, data.data);
          this.addUpdateFoodRadioIndex = '';
        }
      },
      //删除图片修改早中晚
      deleteUpdateFoodImageURL(val,index){
        this.updateAdminLinePrepareObj.foodList[index].ts_fd_Image = this.updateAdminLinePrepareObj.foodList[index].ts_fd_Image.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //修改景点数量选中
      changeUpdateTourSite(){
        if(this.tourUpdateNum<this.updateAdminLinePrepareObj.tourList.length){
          this.updateAdminLinePrepareObj.tourList = this.updateAdminLinePrepareObj.tourList.slice(0,this.tourUpdateNum)
        }else if(this.tourUpdateNum==this.updateAdminLinePrepareObj.tourList.length){
          this.$notify.error({
            message: '选中一样.'
          });
        }else{
          for(var i=this.updateAdminLinePrepareObj.tourList.length;i<this.tourUpdateNum;i++){
            this.updateAdminLinePrepareObj.tourList.push({
              "ts_ts_TourName": "",//景点名称
              "ts_ts_NeedMinute": '',//游玩时长  单位分钟
              "ts_ts_Des": "",//景区简介
              "ts_ts_Image": [],//景区图片
              "ts_ts_OpenTime": "",//开放时间
              "ts_ts_Address": "",//景点地址
              "ts_ts_Fee": "",//费用情况  自费/免费
              "ts_ts_Time": "",//时间 格式HH:mm
            })
          }
        }
      },
      //修改酒店数量选中
      changeUpdateHotel(){
        if(this.hotelUpdateNum<this.updateAdminLinePrepareObj.hotelList.length){
          this.updateAdminLinePrepareObj.hotelList = this.updateAdminLinePrepareObj.hotelList.slice(0,this.hotelUpdateNum)
        }else if(this.hotelUpdateNum==this.updateAdminLinePrepareObj.hotelList.length){
          this.$notify.error({
            message: '选中一样.'
          });
        }else{
          for(var i=this.updateAdminLinePrepareObj.hotelList.length;i<this.hotelUpdateNum;i++){
            this.updateAdminLinePrepareObj.hotelList.push({
              "ts_hl_HotelName": "",//酒店名称
              "ts_hl_Star": "",//酒店星级
              "ts_hl_LookHotel": "",//参考酒店
              "ts_hl_HotelDes": "",//酒店介绍
              "ts_hl_StandardRoom": "",//标准间
              "ts_hl_BedType": "",//床型
              "ts_hl_Good": "",//设施
              "ts_hl_HotelImage": [],//酒店图片
              "ts_hl_Address": "",//酒店地址
              "ts_hl_HappyNotice": "",//温馨提示
              "ts_hl_Time": "",//时间
            })
          }
        }
      },
      //修改标题数量选中
      changeUpdateTitle(){
        if(this.updateNum<this.updateAdminLinePrepareObj.titleList.length){
          this.updateAdminLinePrepareObj.titleList = this.updateAdminLinePrepareObj.titleList.slice(0,this.updateNum)
        }else if(this.updateNum==this.updateAdminLinePrepareObj.titleList.length){
          this.$notify.error({
            message: '选中一样.'
          });
        }else{
          for(var i=this.updateAdminLinePrepareObj.titleList.length;i<this.updateNum;i++){
            this.updateAdminLinePrepareObj.titleList.splice(-1,0,{
              "ts_dtp_FromSite": "",//出发站点
              "ts_dtp_GoWay": '',//出行方式0汽车  1火车 2飞机  3轮船
              "ts_dtp_ReachSite": "",
            })
//            this.updateAdminLinePrepareObj.titleList.push({
//              "ts_dtp_FromSite": "",//出发站点
//              "ts_dtp_GoWay": '',//出行方式0汽车  1火车 2飞机  3轮船
//              "ts_dtp_ReachSite": "",
//            })
          }
        }
      },
      //获取自由活动图片
      getFreeData(data){
        if (!this.addFreeRadioIndex) {
          this.FreeImageURL.push(data.data);
        } else {
          this.FreeImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.addFreeRadioIndex = '';
        }
      },
      //删除自由活动图片
      deleteFreeImageURL(val){
        this.FreeImageURL = this.FreeImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //添加自由活动
      addFreeActivities(){
        this.isFreeActivities = true;
      },
      //删除酒店图片
      deleteHotelImageURL(val, index){
        this.hotelJson[index].ImageURL = this.hotelJson[index].ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //获取酒店图片信息
      getHotelData(data){
        if (!this.addHotelRadioIndex) {
          this.hotelJson[data.index].ImageURL.push(data.data);
        } else {
          this.hotelJson[data.index].ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.addHotelRadioIndex = '';
        }
      },
      //选中酒店
      changeHotel(){
        this.hotelJson = [];
        for (var i = 0; i < this.hotelNum; i++) {
          this.hotelJson.push({
            ImageURL: [],
            "ts_hl_HotelName": "",//酒店名称
            "ts_hl_Star": "",//酒店星级
            "ts_hl_LookHotel": "",//参考酒店
            "ts_hl_HotelDes": "",//酒店介绍
            "ts_hl_StandardRoom": "",//标准间
            "ts_hl_BedType": "",//床型
            "ts_hl_Good": "",//设施
            "ts_hl_HotelImage": "",//酒店图片
            "ts_hl_Address": "",//酒店地址
            "ts_hl_HappyNotice": "",//温馨提示
            "ts_hl_Time": "",//时间
          })
        }
      },
      //添加美食图片删除
      deleteFoodImageURL(val, index){
        this.isFoodUploaNode = false;
        this.foodJson[index].ImageURL = this.foodJson[index].ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //选中景点
      changeTourSite(){
        this.tourSiteJson = [];
        for (var i = 0; i < this.tourNum; i++) {
          this.tourSiteJson.push({
            ImageURL: [],
            "ts_ts_TourName": "",//景点名称
            "ts_ts_NeedMinute": '',//游玩时长  单位分钟
            "ts_ts_Des": "",//景区简介
            "ts_ts_Image": "",//景区图片
            "ts_ts_OpenTime": "",//开放时间
            "ts_ts_Address": "",//景点地址
            "ts_ts_Fee": "",//费用情况  自费/免费
            "ts_ts_Time": "",//时间 格式HH:mm
          })
        }
      },
      //选中标题
      changeTitle(){
        this.titleJson = [];
        for (var i = 0; i < this.num; i++) {
          this.titleJson.push({
            "ts_dtp_FromSite": "",//出发站点
            "ts_dtp_GoWay": '',//出行方式0汽车  1火车 2飞机  3轮船
            "ts_dtp_ReachSite": "",
          })
        }
      },
      //图片上传
      getData(data) {
        if (!this.addRadioIndex) {
          this.tourSiteJson[data.index].ImageURL.push(data.data);
        } else {
          this.tourSiteJson[data.index].ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.addRadioIndex = '';
        }
      },
      //美食获取数据
      getFoodData(data){
        if (!this.addFoodRadioIndex) {
          this.foodJson[data.index].ImageURL.push(data.data);
        } else {
          this.foodJson[data.index].ImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.addFoodRadioIndex = '';
        }
      },
      //修改图片
      updateImage(data) {
        if (!this.radioIndex) {
          this.updateImageURL.push(data.data);
        } else {
          this.updateImageURL.splice(this.radioIndex - 1, 1, data.data);
          this.radioIndex = '';
        }
      },
      //删除修改对应图片
      deleteUpdateImageURL(val) {
        this.isNewUploaNode = false
        this.updateImageURL = this.updateImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      //删除对应图片
      deleteImageURL(val, index) {
        let uploader = document.querySelector('.uploader-list')
        if (uploader) {
          uploader.querySelector('ul').innerHTML = ''
        }
        this.isUploaNode = false;
        this.tourSiteJson[index].ImageURL = this.tourSiteJson[index].ImageURL.filter(v => {
          if (v == val) {
            return false
          }
          return true
        })
      },
      jump(obj) {
        let MerchanID = sessionStorage.getItem('MerchanID')
        if (MerchanID) {
          window.open('http://hly.1000da.com.cn/index.html#/Comment/agenciesDetail/' + MerchanID, '_blank')
        }
      },
      closeDialog() {
        this.updateAdminLinePrepareDialog = false
        this.addDialog = false
      },
      cacheForm() {

        this.addDialog = false
//        window.location.reload()
      },
      //查询很多
      selectInitData(id, ParentID) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "ts_gi_GoodID": id,//产品编号
          "ts_gi_ParentID": ParentID ? ParentID : ''
        }
        return this.$store.dispatch('initSelectInitAllData', options)
      },
      initData(id) {
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "lineID": id ? id : ''
        };
        this.isLoading = true;
        this.$store.dispatch('initAdminLinePrepare', options)
        .then(() => {
          this.isLoading = false;
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        })
      },
      //查询
      search() {
        if (!this.userSearchID) {
          this.$notify({
            message: '请选择筛选条件',
            type: 'error'
          });
          return;
        }
        this.initData(this.userSearchID)
      },
      //查询初始化数据
      searchInitData() {
        if (this.id) {
          this.initData(this.id)
        }
      },
      //添加
      addAdminLinePrepare() {
        this.isFood = false;
        this.isFreeActivities = false;
        this.isReminder = false;//温馨提示
        this.isTheTravel = false;
        //初始化
        this.titleJson = []
        this.tourSiteJson = []
        this.foodJson =  [{
          "ts_fd_Title": "",
          ImageURL: [],
          "ts_fd_UseType": 0,//0早餐 1中餐  2晚餐
          "ts_fd_UseName": '早餐',//0早餐 1中餐  2晚餐
          "ts_fd_Include": "",//0个人自理  1已含
          "ts_fd_Des": "",//美食描述 富文本格式
          "ts_fd_Image": "",//美食图片
          "ts_fd_HappyNotice": "",//温馨提示  富文本格式
          "ts_fd_Time": "",//用餐时间  格式HH:mm
          "ts_fd_WasteMinute": '',//耗时
        }, {
          "ts_fd_Title": "",
          ImageURL: [],
          "ts_fd_UseType": 1,//0早餐 1中餐  2晚餐
          "ts_fd_UseName": '中餐',//0早餐 1中餐  2晚餐
          "ts_fd_Include": "",//0个人自理  1已含
          "ts_fd_Des": "",//美食描述 富文本格式
          "ts_fd_Image": "",//美食图片
          "ts_fd_HappyNotice": "",//温馨提示  富文本格式
          "ts_fd_Time": "",//用餐时间  格式HH:mm
          "ts_fd_WasteMinute": '',//耗时
        }, {
          "ts_fd_Title": "",
          ImageURL: [],
          "ts_fd_UseType": 2,//0早餐 1中餐  2晚餐
          "ts_fd_UseName": '晚餐',//0早餐 1中餐  2晚餐
          "ts_fd_Include": "",//0个人自理  1已含
          "ts_fd_Des": "",//美食描述 富文本格式
          "ts_fd_Image": "",//美食图片
          "ts_fd_HappyNotice": "",//温馨提示  富文本格式
          "ts_fd_Time": "",//用餐时间  格式HH:mm
          "ts_fd_WasteMinute": '',//耗时
        }]
        this.hotelJson = [];
        this.num = 0
        this.hotelNum = 0
        this.tourNum = 0
        for (var attr in this.addData) {
          this.addData[attr] = ''
        }
        this.ImageURL = [];
        let uploader = document.querySelector('.uploader-list')
        if (uploader) {
          uploader.querySelector('ul').innerHTML = ''
        }
        let textArr = document.querySelectorAll('.w-e-text')
        if (textArr && textArr.length) {
          for (var i = 0; i < textArr.length; i++) {
            textArr[i].innerHTML = ''
          }
        }
        this.addDialog = true;
      },
      //添加提交
      addSubmit() {
        if (this.FreeImageURL.length) {
          this.addData.ts_pt_FreeImage = JSON.stringify(this.FreeImageURL)
        }
        this.titleJson.push({
          "ts_dtp_FromSite": this.ReachSite,//出发站点
          "ts_dtp_GoWay": '',//出行方式0汽车  1火车 2飞机  3轮船
          "ts_dtp_ReachSite": this.ReachSite,
        })
//        "ts_dtp_FromSite": "",//出发站点
//          "ts_dtp_GoWay": '',//出行方式0汽车  1火车 2飞机  3轮船
//          "ts_dtp_ReachSite": "",
        if (this.hotelJson.length) {
          for (var i = 0; i < this.hotelJson.length; i++) {
            this.hotelJson[i].ts_hl_HotelImage = JSON.stringify(this.hotelJson[i].ImageURL)
            delete this.hotelJson[i].ImageURL
          }
        }
        if (this.foodJson.length) {
          for (var i = 0; i < this.foodJson.length; i++) {
            this.foodJson[i].ts_fd_Image = JSON.stringify(this.foodJson[i].ImageURL)
            delete this.foodJson[i].ImageURL
          }
        }
        if (this.tourSiteJson.length) {
          for (var i = 0; i < this.tourSiteJson.length; i++) {
            this.tourSiteJson[i].ts_ts_Image = JSON.stringify(this.tourSiteJson[i].ImageURL)
            delete this.tourSiteJson[i].ImageURL
          }
        }
        if (isNaN(this.addData.ts_pt_Day)) {
          this.$notify({
            message: '第几天行程请输入数字!',
            type: 'error'
          });
          return
        }
        this.addOptions.titleJson = this.titleJson;
        this.addOptions.hotelJson = this.hotelJson;
        this.addOptions.tourSiteJson = this.tourSiteJson;
        this.addOptions.foodJson = this.foodJson;

        this.addData.ts_pt_Product_LineID = this.id;
        this.addOptions.data = this.addData;
        this.$store.dispatch('AddAdminLinePrepare', this.addOptions)
        .then((suc) => {
          this.$notify({
            message: suc,
            type: 'success'
          });
//          window.location.reload()
          this.initData(this.id)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.addDialog = false
      },
      //修改
      updateAdminLinePrepare(obj) {
        this.updateAdminLinePrepareObj = obj
        this.updateAdminLinePrepareDialog = true;
//        this.$nextTick(() => {
//          this.$refs.editor.setHtml(obj.ts_pt_Content)
//        })
//        if (obj.ts_pt_FreeImage) {
//          this.updateImageURL = obj.ts_pt_FreeImage.split(',')
//        }
      },
      //修改提交
      updateAdminLinePrepareSubmit() {

//          "ts_dtp_FromSite": '',//出发站点
//          "ts_dtp_GoWay": '',//出行方式0汽车  1火车 2飞机  3轮船
//          "ts_dtp_ReachSite": this.ReachSite,
//        })
        this.updateAdminLinePrepareObj.titleList[this.updateAdminLinePrepareObj.titleList.length-1].ts_dtp_ReachSite = this.updateAdminLinePrepareObj.titleList[this.updateAdminLinePrepareObj.titleList.length-1].ts_dtp_FromSite
//        this.updateAdminLinePrepareObj.titleList[this.updateAdminLinePrepareObj.titleList.length-1].ts_dtp_FromSite = this.ReachSite
        this.updateAdminLinePrepareObj.titleList[this.updateAdminLinePrepareObj.titleList.length-1].ts_dtp_GoWay = ''
//        console.log(this.updateAdminLinePrepareObj)
//        return
        if (isNaN(this.updateAdminLinePrepareObj.ts_pt_Day)) {
          this.$notify({
            message: '第几天行程请输入数字!',
            type: 'error'
          });
          return
        }
        for(var i=0;i<this.updateAdminLinePrepareObj.foodList.length;i++){
          this.updateAdminLinePrepareObj.foodList[i].ts_fd_Image = JSON.stringify(this.updateAdminLinePrepareObj.foodList[i].ts_fd_Image)
        }
        for(var i=0;i<this.updateAdminLinePrepareObj.tourList.length;i++){
          this.updateAdminLinePrepareObj.tourList[i].ts_ts_Image = JSON.stringify(this.updateAdminLinePrepareObj.tourList[i].ts_ts_Image)
        }
        for(var i=0;i<this.updateAdminLinePrepareObj.hotelList.length;i++){
          this.updateAdminLinePrepareObj.hotelList[i].ts_hl_HotelImage = JSON.stringify(this.updateAdminLinePrepareObj.hotelList[i].ts_hl_HotelImage)
        }
        let updateOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          data: {
            "ts_pt_ID": this.updateAdminLinePrepareObj.ts_pt_ID,
            "ts_pt_Day": this.updateAdminLinePrepareObj.ts_pt_Day,
//            "ts_pt_Content": getEscapeVal(this.updateAdminLinePrepareObj.ts_pt_Content),
//            "ts_pt_Name": this.updateAdminLinePrepareObj.ts_pt_Name,
            "ts_pt_Remark": this.updateAdminLinePrepareObj.ts_pt_Remark,
            "ts_pt_Describe": this.updateAdminLinePrepareObj.ts_pt_Describe,
            "ts_pt_FreeTitle": this.updateAdminLinePrepareObj.ts_pt_FreeTitle,//自由活动标题
            "ts_pt_FreeDes": this.updateAdminLinePrepareObj.ts_pt_FreeDes,//自由活动介绍
            "ts_pt_FreeImage": JSON.stringify(this.updateAdminLinePrepareObj.ts_pt_FreeImage),//自由活动图片
            "ts_pt_TourShow": this.updateAdminLinePrepareObj.ts_pt_TourShow,//行程概览
            "ts_pt_HappyNotice": this.updateAdminLinePrepareObj.ts_pt_HappyNotice,//温馨提示
          },
          titleJson:this.updateAdminLinePrepareObj.titleList,
          foodJson:this.updateAdminLinePrepareObj.foodList,
          tourSiteJson:this.updateAdminLinePrepareObj.tourList,
          hotelJson:this.updateAdminLinePrepareObj.hotelList,
        };
        this.$store.dispatch('UpdateAdminLinePrepare', updateOptions)
        .then(() => {
          this.$notify({
            message: '修改成功!',
            type: 'success'
          });
          this.initData(this.updateAdminLinePrepareObj.ts_pt_Product_LineID)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
        this.updateAdminLinePrepareDialog = false;
      },
      //删除
      deleteAdminLinePrepare(id) {
        let deleteOptions = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "data": {
            "ts_pt_ID": id,
          }
        };

        this.$store.dispatch('DeleteAdminLinePrepare', deleteOptions)
        .then(() => {
          this.$notify({
            message: '删除成功!',
            type: 'success'
          });
          this.initData(this.id)
        }, err => {
          this.$notify({
            message: err,
            type: 'error'
          });
        });
      },
      //点击跳转日程时间管理
      scheduleTimeManagement(id) {
        this.$store.commit('adminScheduleTimeManagementId', id);
        this.$router.push({name: 'AdminScheduleTime'});
        sessionStorage.setItem('index', '3')
      }
    },
    created() {
      for (var i = 1; i < 8; i++) {
        this.options.push({
          id: i,
          value: i
        })
      }
      let AdminQueryProductInformationListName = sessionStorage.getItem('AdminQueryProductInformationListName')
      if (AdminQueryProductInformationListName !== '预订须知') {
        sessionStorage.setItem('AdminQueryProductInformationListName', '线路日程')
      }
      this.initData(this.id)
    },
    mounted() {
      this.searchInitData();
    }
  }
</script>
<style scoped>


  .imgWap span {
    position: absolute;
    right: -15px;
    top: -6px;
  }

  .imgWap em {
    position: absolute;
    right: -55px;
    top: 30px;
    font-style: normal;
    color: #42b983;
  }
</style>
