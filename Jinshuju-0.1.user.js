// ==UserScript==
// @name         Jinshuju
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Yang Weiguang
// @match        https://jinshuju.net/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var vote_index = '作品***'
    setTimeout(() => {
                window.location.href = "https://jinshuju.net/f/D2nmjJ"; // 您的目标跳转
    },50000)

    // 页面加载完成后执行的函数
    function onPageLoad() {
        // 检查是否设置了跳转标记
        if (localStorage.getItem("triggerRedirect")) {
            //
            setTimeout(() => {
                window.location.href = "https://jinshuju.net/f/D2nmjJ"; // 您的目标跳转
                localStorage.removeItem("triggerRedirect");
                // 清除 Cookie
                document.cookie.split(";").forEach(c => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
            }, 20000 + Math.floor(Math.random() * 5000)) // 10秒后执行跳转
            return;
        }
        // 清除 Cookie
                document.cookie.split(";").forEach(c => {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        })
        // 您之前的函数放在这里
        function extractAndSortData() {
            // 使用 querySelectorAll 替代 getElementsByClassName
            const elements = document.querySelectorAll('.ant-row.ant-form-item-row');

            // 提取数据并存储在数组中
            const data = Array.from(elements).map(element => {
                const firstCol = element.childNodes[0].lastChild.textContent.trim();

                // 执行点击操作
                const clickTarget = element.querySelector('.other-choice-option-name');
                if (clickTarget) {
                    clickTarget.click();
                    clickTarget.click();
                }

                const secondColText = element.lastChild.textContent.trim();

                // 使用正则表达式提取“投票”后面的数字
                const secondColNumber = secondColText.match(/投票(\d+)/);
                const secondCol = secondColNumber ? parseInt(secondColNumber[1], 10) : null;

                return [firstCol, secondCol];
            });

            // 按第二列数值逆序排序
            data.sort((a, b) => b[1] - a[1]);

            return data;
        }

        // 生成表格的HTML
        function generateTableHtml(data) {
            let tableHtml = '<table style="border-collapse: collapse; width: 100%;">';
            tableHtml += '<tr><th style="border: 1px solid #ddd; padding: 8px;">排名</th><th style="border: 1px solid #ddd; padding: 8px;">作品名称</th><th style="border: 1px solid #ddd; padding: 8px;">票数</th></tr>';

            data.forEach((row, index) => {
                tableHtml += `<tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${row[0]}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${row[1]}</td>
                              </tr>`;
            });

            tableHtml += '</table>';
            return tableHtml;
        }

        // 调用您的函数
        // 延迟执行并显示结果
        setTimeout(function() {
            const result = extractAndSortData();
            if (checkNullObj(result)){
                const tableHtml = generateTableHtml(result);
                const tableWindow =window.open('', '', 'width=600,height=400');// 以弹窗形式显示结果
                tableWindow.document.write(tableHtml);
                voteForWork(vote_index,tableWindow);
            }
        }, 5000+ Math.floor(Math.random() * 5000)); // 5000毫秒后执行
    }

    function checkNullObj (obj) {
        if (Object.keys(obj).length === 0) {
            return false // 如果为空,返回false
        }
        return true // 如果不为空，则会执行到这一步，返回true
    }

    function voteForWork(workName, tableWindow) {
        const elements = document.querySelectorAll('.ant-row.ant-form-item-row');
        let hasVoted = false;
        elements.forEach(element => {
            const title = element.childNodes[0].lastChild.textContent.trim();
            if (title === workName) {
                const voteButton = element.querySelector('.other-choice-option-name');
                if (voteButton) {
                    voteButton.click();
                    hasVoted = true;
                }
            }
        });

        if (hasVoted) {
            window.addEventListener("unload", function() {
                localStorage.setItem("triggerRedirect", true);
            });
            // 提交投票
            setTimeout(() => {
                const submitButton = document.querySelector('.ant-btn.ant-btn-primary.ant-btn-two-chinese-chars.form-theme--submit-button.published-form__submit.FooterButton_button__vJkWw');
                if (submitButton) {
                    submitButton.click();
                    // setTimeout(() =>{console.log('new herf');swindow.location.href = "https://jinshuju.net/f/D2nmjJ";},10000)
                }
            }, 5000+ Math.floor(Math.random() * 5000)); // 延迟 1 秒后提交，确保投票操作已完成
        }
        // 延迟关闭表格窗口
        setTimeout(() => {
            if (tableWindow) {
                tableWindow.close();
                // setTimeout(() =>{console.log('new herf');swindow.location.href = "https://jinshuju.net/f/D2nmjJ";},5000)
            }
        }, 4000+ Math.floor(Math.random() * 5000)); // 3秒后关闭


        //
    }

    // 确保页面完全加载后再执行脚本
    window.addEventListener('load', onPageLoad);
})();