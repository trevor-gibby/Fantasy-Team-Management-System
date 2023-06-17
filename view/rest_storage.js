
class RestStorageService {
    constructor() {
        this.sort_col = 'id';
        this.sort_dir = 'asc';
        this.limit=10;
        this.offset=0;
        this.filter_col='id';
        this.filter_str='';
    }

    reset()
    {
        this.sort_col = 'id';
        this.sort_dir = 'asc';
        this.limit=10;
        this.offset=0;
        this.filter_col='id';
        this.filter_str='';
    }

    get_all_teams() {
        let request = $.ajax({
            type: 'GET', 
            url: '/teams', 
            dataType: 'json',
            data: {
                sort_col: this.sort_col,
                sort_dir: this.sort_dir,
                limit: this.limit,
                offset: this.offset,
                filter_col: this.filter_col,
                filter_str: this.filter_str
            }
        })
        .done( data => {
            
            return data;
        })
        .fail( () => {
            return 'err';
        })
        .always( () => {
            ;
        })
        return request;
    }

    get_one_team(id) {
        let request = $.ajax({
            type: 'GET', 
            url: `/teams/${id}`, 
            dataType: 'json',
        })
        .done( data => {
            
            return data;
        })
        .fail( () => {
            return 'err';
        })
        .always( () => {
            
        })
        return request;
    }

    edit_team(edited_team, id, refresh) {
        let request = $.ajax({
            type: 'PUT', 
            url: `/teams/${id}`, 
            dataType: 'json',
            data: {
                name: edited_team.name,
                owner_id: edited_team.owner_id,
                league_id: edited_team.league_id,
                notes: edited_team.notes
            }
        })
        .done( () => {
            
            if (refresh){
                app_controller.render_teams_list();
                $('#view-display').scrollView();
            }
        })
        .fail( () => {
            console.log('failure');
        })
    }

    create_team(new_team) {
        let request = $.ajax({
            type: 'POST', 
            url: `/teams/`, 
            dataType: 'json',
            data: {
                name: new_team.name,
                owner_id: 1,
                league_id: 1,
                notes: new_team.notes
            }
        })
        .done( () => {
            
            app_controller.render_teams_list();
            $('#view-display').scrollView();
        })
        .fail( () => {
            console.log('failure');
        })
    }

    delete_team(id) {
        console.log(`/teams/${id}`);
        let request = $.ajax({
            type: 'DELETE',
            url: `/teams/${id}`,
        })
        .done( data => {
            
            app_controller.render_teams_list();
            $('#view-display').scrollView();
        })
    }

    get_all_owners() {
        if (this.sort_col === 'address1') {
            this.sort_col = `address1 ${this.sort_dir}, address2 ${this.sort_dir}, city ${this.sort_dir}, state ${this.sort_dir}, zip`
        }
        let request = $.ajax({
            type: 'GET', 
            url: '/owners', 
            dataType: 'json',
            data: {
                sort_col: this.sort_col,
                sort_dir: this.sort_dir,
                limit: this.limit,
                offset: this.offset,
                filter_col: this.filter_col,
                filter_str: this.filter_str
            }
        })
        .done( data => {
            
            if (this.sort_col.includes('address1')) this.sort_col = 'address1';
            return data;
        })
        .fail( () => {
            return 'err';
        })
        .always( () => {
            
        })
        return request;
    }

    get_one_owner(id) {
        let request = $.ajax({
            type: 'GET', 
            url: `/owners/${id}`, 
            dataType: 'json',
        })
        .done( data => {
            
            return data;
        })
        .fail( () => {
            return 'err';
        })
        .always( () => {
            
        })
        return request;
    }

    edit_owner(edited_owner, id, refresh) {
        let request = $.ajax({
            type: 'PUT', 
            url: `/owners/${id}`, 
            dataType: 'json',
            data: {
                first_name: edited_owner.first_name,
                last_name: edited_owner.last_name,
                address1: edited_owner.address1,
                address2: edited_owner.address2,
                city: edited_owner.city,
                state: edited_owner.state,
                zip: edited_owner.zip,
                team_id: edited_owner.team_id,
                email: edited_owner.email,
                phone: edited_owner.phone,
                password: edited_owner.password,
                user_name: edited_owner.user_name
            }
        })
        .done( data => {
            
            if (refresh){
                app_controller.render_owners_list();
                $('#view-display').scrollView();
            }
        })
        .fail( () => {
            console.log('failure');
        })
    }

    create_owner(new_owner) {
        let request = $.ajax({
            type: 'POST', 
            url: `/owners`, 
            dataType: 'json',
            data: {
                first_name: new_owner.first_name,
                last_name: new_owner.last_name,
                address1: new_owner.address1,
                address2: new_owner.address2,
                city: new_owner.city,
                state: new_owner.state,
                zip: new_owner.zip,
                email: new_owner.email,
                phone: new_owner.phone,
                password: new_owner.password,
                user_name: new_owner.user_name
            }
        })
        .done( () => {
            
            app_controller.render_owners_list();
            $('#view-display').scrollView();
        })
        .fail( () => {
            return 'err';
        })
        .always( () => {
            
        })
        return request;
    }

    delete_owner(id) { // Be sure to delete their team first
        let request = $.ajax({
            type: 'DELETE',
            url: `/owners/${id}`,
        })
        .done( data => {
            
            app_controller.render_owners_list();
            $('#view-display').scrollView();
        })
    }
}
