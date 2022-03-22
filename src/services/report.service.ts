import ApiService from "./api.service";
import { alertController } from '@ionic/vue';
import router from '../router'

import i18n from '../i18n'

const { t } = i18n.global

const ReportService = {
    async toggleReportMenu(name: string, message: string) {
        const alert = await alertController
           .create({
           cssClass: 'my-custom-class',
           header: t('report.header'),
           message: t('report.message'),
           buttons: [
               {
                   text: t('report.cancel'),
                   role: 'cancel',
                   cssClass: 'secondary',
                   id: 'cancel-button',
               },
               {
                   text: t('report.confirm'),
                   id: 'confirm-button',
                   handler: async () => {
                       let url = '/mail';
                       let post = {
                           name: name,
                           message: message
                       }
                       let response = await ApiService.post(url, post)
                       console.log(response)
                   },
               },
           ],
        });
        return alert.present();
    },
    async toggleResolveMatchMenu(matchId: string) {
        const alert = await alertController
        .create({
        cssClass: 'my-custom-class',
        header: 'Match auflösen',
        message: 'Möchtest du den Match auflösen? Ihr könnt euch dann keine Nachrichten mehr schicken.',
        buttons: [
            {
                text: 'Abbrechen',
                role: 'cancel',
                cssClass: 'secondary',
                id: 'cancel-button',
            },
            {
                text: 'Auflösen',
                id: 'confirm-button',
                handler: async () => {
                    let url = '/matches/' + matchId;
                    let post = {
                        status: 0,
                    }
                    let response = await ApiService.patch(url, post)
                    console.log(response)
                    return router.push('/matches');

                },
            },
        ],
     });
     return alert.present();
    }
}

export default ReportService;
