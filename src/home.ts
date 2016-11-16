import {inject} from 'aurelia-framework'
import {HttpClient} from 'aurelia-http-client';
import 'c3';
import 'parse';

const Parse = require('parse')
const c3 = require('c3')

/* 
 *   The "Home"-Page. The only content-page in this app. 
 *   Shows the gender diversion of all registered users in a table and a pie-chart 
*/
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

    /* Loads all user profiles from the parse Server*/
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

    /* Iterates over the given profiles, counts all genders and save the result in the genders list */
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

    /* Draws the gender pie-chart */
    drawChart () {
        c3.generate({
            bindto: '#chart',
            data: {
                type : 'pie',
                columns: this.createChartData()
            }
        });
    }

    /* Transforms the genders list into a dataSet that can used in the chart */
    createChartData () {
        let data:Array<any> = [];
        for (let gender of this.genders) {
            data.push([gender.gender, gender.count]);
        }
        return data;
    }
    
}