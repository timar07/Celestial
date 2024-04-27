import { SceneManager } from './SceneManager';
import { CelestialModel } from './model/CelestialObject';
import { AU, KM } from './Constants';
import Mars from './data/Mars';
import { PlanetSubject } from './subjects/PlanetSubject';
import { StarSubject } from './subjects/StarSubject';
import Venus from './data/Venus';
import Mercury from './data/Mercury';
import Sun from './data/Sun';
import Jupyter from './data/Jupyter';
import Saturn from './data/Saturn';
import Uranus from './data/Uranus';
import Neptune from './data/Neptune';
import UISettingsManager from './ui/UISettingsManager';
import UISlider from './ui/UISlider';
import Scale from './Scale';
import UINamedGroup from './ui/UINamedGroup';
import UIObjectInfo from './ui/UIObjectInfo';
import Time from './Time';
import UITimeComponent from './ui/UITimeComponent';
import Earth from './data/Earth';
import { VSOP } from './data/VSOP';
import UIPlayButton from './ui/UIPlayButton';
import UIRoundedButton from './ui/UIRoundedButton';
import UIHStack from './ui/UIHStack';
import "./css/app.css"

class App {
    private manager: SceneManager
    private settings: UISettingsManager;
    private isPlaying = true;

    constructor() {
        this.manager = new SceneManager(document.createElement('canvas'))

        this.settings = new UISettingsManager();
        this.settings.handleHashChange = (hash) => {
            const uuid = location.hash.match(/(?<=#\/object\/)([A-z|0-9|-]*)/g)?.[0];
            const subject = this.manager.getSubjectByUUID(uuid || '');

            if (subject instanceof PlanetSubject) {
                this.manager.setPivot(subject);
                const info = new UIObjectInfo(subject);
                this.manager.events.on('update', () => info.update());
                return info;
            } else {
                this.manager.setPivot(undefined);
            }
        }

        this.settings
            .addController(new UITimeComponent())
            .addController(
                new UINamedGroup(
                    'Масштаб планет',
                    new UISlider(
                        1,
                        100,
                        1,
                        (val) => `${Number(val).toFixed(1)}x`
                    )
                        .onChange((val) => Scale.setScale(val))
                )
            )
            .addController(
                new UINamedGroup(
                    'Скорость анимации',
                    new UISlider(
                        1,
                        100,
                        1,
                        (val) => `1 сек = ${val} дн.`
                    )
                        .onChange((val) => Time.setDelta(val))
                )
            )
            .addController(
                new UIHStack([
                    new UIRoundedButton(40, 'ui-rewind-back')
                        .onClick(() => Time.setDelta(-Math.abs(Time.getDelta()))),
                    new UIPlayButton()
                        .onClick(() => {
                            this.isPlaying = !this.isPlaying;
                            this.manager.toggleFreeze();
                        }),
                    new UIRoundedButton(40, 'ui-rewind-forward')
                        .onClick((el) => {
                            Time.setDelta(Math.abs(Time.getDelta()))
                        })
                ])
            )

        this.manager.addSubject(
            new StarSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Солнце',
                    mass: 2*Math.pow(10, 30),
                    radius: 0.00465047*AU,
                    color: 0xffffff,
                    orbit: Sun,
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Марс',
                    mass: 6.417*Math.pow(10, 20),
                    radius: 3389.5*1000,
                    color: 0x80E8DD,
                    orbit: Mars,
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Венера',
                    mass: 4.8675 * 10**24,
                    radius: 6051.8*KM,
                    color: 0x7CC2F6,
                    orbit: Venus,
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Меркурий',
                    mass: 3.3011e23,
                    radius: 2439.7*KM,
                    color: 0xAF81E4,
                    orbit: Mercury,
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Юпитер',
                    mass: 1.8982e27,
                    radius: 69911*KM,
                    color: 0xE784BA,
                    orbit: Jupyter,
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Сатурн',
                    mass: 5.6834e26,
                    radius: 58232*KM,
                    color: 0xF9C1A0,
                    orbit: Saturn,
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Уран',
                    mass: 8.6810e25,
                    radius: 25362*KM,
                    color: 0xB7F6AF,
                    orbit: Uranus,
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Нептун',
                    mass: 1.024e26,
                    radius: 24622*KM,
                    color: 0xF4E7B8,
                    orbit: Neptune
                })
            )
        );

        this.manager.addSubject(
            new PlanetSubject(
                this.manager.getScene(),
                new CelestialModel({
                    name: 'Земля',
                    mass: 5.972168e24,
                    radius: 6371*KM,
                    color: 0xF4E7B8,
                    orbit: Earth,
                    customPositionCalculator: VSOP
                })
            )
        );
    }

    animate() {
        setTimeout(() => {
            this.manager.update()
            requestAnimationFrame(() => this.animate())
        }, 1/60)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new App().animate();
});
