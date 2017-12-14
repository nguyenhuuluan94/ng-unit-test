import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {
    heroes = [
        {
            id: 1,
            name: 'Wonder woman'
        },
        {
            id: 2,
            name: 'Superman'
        },
        {
            id: 3,
            name: 'Captain america'
        },
    ];
    
    constructor() { }

    getHero(id: number): Hero {
        for(let hero of this.heroes) {
            if (hero.id === id) {
                return hero;
            }
        }
        return null;
    }
}