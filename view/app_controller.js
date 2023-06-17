
class AppController {
    constructor() {
        this.storageService = new RestStorageService();
        this._view = new View(this.storageService);
    }
    get view(){
        return this._view;
    }
    reset(){
        this.view.reset();
    }
    render_owners_list(){
        this.storageService.reset();
        this.storageService.filter_col = 'first_name';
        this.storageService.sort_col = 'first_name';
        this.view.render('list', 'owners');
    }

    render_teams_list(){
        this.storageService.reset();
        this.storageService.filter_col = 'name';
        this.storageService.sort_col = 'name';
        this.view.render('list', 'teams')
    }
}
