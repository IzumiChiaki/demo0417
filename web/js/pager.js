// JavaScript Document
/**
 * js分页类
 * @param iAbsolute 每页显示记录数
 * @param sTableId 分页表格属性ID值，为String
 * @param sTBodyId 分页表格TBODY的属性ID值,为String,此项为要分页的主体内容
 * @Version 1.0.0
 * @author 辛现宝 2007-01-15 created
 * var __variable__; private
 * function __method__(){};private
 */
function Page(iAbsolute,sTableId,sTBodyId,pageBar)
{
    this.absolute = iAbsolute; //每页最大记录数
    this.tableId = sTableId;
    this.tBodyId = sTBodyId;
    this.pageBar = pageBar;
    this.rowCount = 0;//记录数
    this.pageCount = 0;//页数
    this.pageIndex = 0;//页索引
    this.__oTable__ = null;//表格引用
    this.__oTBody__ = null;//要分页内容
    this.__dataRows__ = 0;//记录行引用
    this.__oldTBody__ = null;
    this.__init__(); //初始化;
};
/*
初始化
*/
Page.prototype.__init__ = function(){
    this.__oTable__ = document.getElementById(this.tableId);//获取table引用
    this.__oTBody__ = this.__oTable__.tBodies[this.tBodyId];//获取tBody引用
    this.__dataRows__ = this.__oTBody__.rows;
    this.rowCount = this.__dataRows__.length;
    try{
        this.absolute = (this.absolute <= 0) || (this.absolute>this.rowCount) ? this.rowCount : this.absolute;
        this.pageCount = parseInt(this.rowCount%this.absolute == 0
            ? this.rowCount/this.absolute : this.rowCount/this.absolute+1);
    }catch(exception){}

    this.__updateTableRows__();
};

/*
下一页
*/
Page.prototype.nextPage = function(){
    if(this.pageIndex + 1 < this.pageCount){
        this.pageIndex += 1;
        this.__updateTableRows__();
    }
};
/*
上一页
*/
Page.prototype.prePage = function(){
    if(this.pageIndex >= 1){
        this.pageIndex -= 1;
        this.__updateTableRows__();
    }
};
/*
首页
*/
Page.prototype.firstPage = function(){
    if(this.pageIndex != 0){
        this.pageIndex = 0;
        this.__updateTableRows__();
    }
};
/*
尾页
*/
Page.prototype.lastPage = function(){
    if(this.pageIndex+1 != this.pageCount){
        this.pageIndex = this.pageCount - 1;
        this.__updateTableRows__();
    }
};
/*
页定位方法
*/

Page.prototype.aimPage = function(){
    var iPageIndex=document.getElementById("pageno").value;
    if(iPageIndex > this.pageCount-1){
        this.pageIndex = this.pageCount - 1;
    }else if(iPageIndex <= 0){
        this.pageIndex = 0;
    }else{
        this.pageIndex = iPageIndex-1;
    }
    this.__updateTableRows__();
};



/*为了兼容firfox , opera和IE*/
Page.prototype.__$$$__ =function ($){
    if (document.getElementById){
        return document.getElementById($);}
    else if (document.all){
        return document.all[$];}
    else if (document.layers){
        return document.layers[$];}
    else {return null;}
}



/*
执行分页时，更新显示表格内容
*/
Page.prototype.__updateTableRows__ = function(){
    var iCurrentRowCount = this.absolute * this.pageIndex;
    var iMoreRow = this.absolute+iCurrentRowCount > this.rowCount ? this.absolute+iCurrentRowCount - this.rowCount : 0;
    var tempRows = this.__cloneRows__();
//alert(tempRows === this.dataRows);
//alert(this.dataRows.length);
    var removedTBody = this.__oTable__.removeChild(this.__oTBody__);
    var newTBody = document.createElement("TBODY");
    newTBody.setAttribute("id", this.tBodyId);

    for(var i=iCurrentRowCount; i < this.absolute+iCurrentRowCount-iMoreRow; i++){
        newTBody.appendChild(tempRows[i]);
    }
    this.__oTable__.appendChild(newTBody);
    /*
    this.dataRows为this.oTBody的一个引用，
    移除this.oTBody那么this.dataRows引用将销失,
    code:this.dataRows = tempRows;恢复原始操作行集合.
    */
    this.__dataRows__ = tempRows;
    this.__oTBody__ = newTBody;
//alert(this.dataRows.length);
//alert(this.absolute+iCurrentRowCount);
//alert("tempRows:"+tempRows.length);

//页脚显示分页结
    var divFood = document.getElementById("divFood");//分页工具栏
    divFood.innerHTML="";
    var rightBar = document.createElement("divFood");
    rightBar.setAttribute("display","");
    rightBar.setAttribute("float","left");
    rightBar.innerHTML="第"+(this.pageIndex+1)+"页/共"+this.pageCount+"页"+", 共"+this.rowCount+"条";
    var isOK="Y";
    var cssColor="";
    divFood.appendChild(rightBar);
//
};



/**//*
/*
克隆原始操作行集合
*/
Page.prototype.__cloneRows__ = function(){
    var tempRows = [];
    for(var i=0; i<this.__dataRows__.length; i++){
        /*
        code:this.dataRows[i].cloneNode(param),
        param = 1 or true:复制以指定节点发展出去的所有节点,
        param = 0 or false:只有指定的节点和它的属性被复制.
        */
        tempRows[i] = this.__dataRows__[i].cloneNode(1);
    }
    return tempRows;
};

function table1(o,a,b){
    var t=document.getElementById(o).getElementsByTagName("tr");
    for(var i=0;i<t.length;i++){
        t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?a:b;
    }
}
//("表格名称","奇数行背景","偶数行背景","鼠标经过背景","点击后背景")