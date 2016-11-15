
import {inject} from 'aurelia-framework'
import {HttpClient} from 'aurelia-http-client';
import 'c3';
import 'parse';

const Parse = require('parse')
const c3 = require('c3')

@inject (HttpClient)
export class Home {

    public userCount: number = 0;
    public genders:Array<any> = [
        {gender: 'male', count: 5},
        {gender: 'female', count: 8},
        {gender: 'something', count: 3},
    ];

    constructor (private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

     activate(params) {
        this.loadUsers();
    }

    loadUsers () {
        var query = new Parse.Query(Parse.User);
        query.find({
            success: (users) => {
                 this.userCount = users.length;
                 this.drawChart();
                 console.log(users);
            }
        });
    }

    drawChart () {
        var chart = c3.generate({
            bindto: '#chart',
            data: {
                type : 'pie',
                columns: this.createChartData()
            }
        });
    }

    createChartData () {
        let data:Array<any> = [];
        for (let gender of this.genders) {
            data.push([gender.gender, gender.count]);
        }
        return data;
    }
    
}