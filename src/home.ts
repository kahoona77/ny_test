import {inject} from 'aurelia-framework'
import {HttpClient} from 'aurelia-http-client';
import 'c3';
import 'parse';

const Parse = require('parse')
const c3 = require('c3')

@inject (HttpClient)
export class Home {

    public userCount: number = 0;
    public genders:Array<any> = [];

    constructor (private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

     activate(params) {
        this.loadUsers();
    }

    loadUsers () {
       let CustomerProfile = Parse.Object.extend("CustomerProfile");
       let query = new Parse.Query(CustomerProfile);
        query.find({
            success: (profiles) => {
                 this.userCount = profiles.length;
                 this.createGenderList(profiles);
                 this.drawChart();
            }
        });
    }

    createGenderList (profiles) {
        for (let profile of profiles) {
            let sex = profile.get('sex');
            if (sex == undefined) {
                sex = 'Not defined';
            }
            let genderCount = this.genders.find(it => it.gender == sex);
            if (!genderCount) {
                genderCount = {gender: sex, count: 0};
                this.genders.push(genderCount);
            }
            genderCount.count++;
        }
    }

    drawChart () {
        c3.generate({
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