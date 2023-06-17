class View 
{
    constructor(storageService)
    {
        this.storage = storageService;
        this.listTemplateHtml="";
        this.appTemplateHtml="";
        this.formTemplateHtml="";
        this.errorTemplateHtml="";

        this.page_num = 1;

        this.type = "";
        this.list_type = "";
    }

    get $listContainer() { return $("#list-container"); }
    get $appContainer() { return $("#app-container"); }
    get $formContainer() { return $("#form-container"); }
    get $errorContainer() { return $("#error-container"); }

    reset()
    {
        this.storage.reset();
        this.$listContainer.empty();
        this.$appContainer.empty();
        this.$formContainer.empty();
        this.$errorContainer.empty();
    }

    async render(type, list_type, id)
    {   
        $('#view-display .loader').removeClass('d-none');
        if (type === undefined) type = this.list_type;
        if (list_type === undefined) list_type = this.list_type;
        this.type = type;
        this.list_type = list_type;
        if (this.type === 'form')
        {
            await this.renderForm(id);
        } 
        else
        {
            this.storage.offset = this.page_num - 1;
            this.renderApp();
            await this.renderList();
        }
        $('#view-display .loader').addClass('d-none');
    }

    renderApp()
    {
        let title;
        if (this.list_type === 'teams') title = 'Fantasy Teams';
        else if (this.list_type === 'owners') title = 'Fantasy Owners';

        this.$appContainer.empty();
        this.$errorContainer.empty();
        this.$formContainer.empty();

        if (!this.appTemplateHtml.length>0){
            this.appTemplateHtml =  this.getTemplateHtml('./templates/app_template.ejs');
        }
        this.$appContainer.html(ejs.render(this.appTemplateHtml, {listTitle: title}));

        this.bindAppEvents();
    }

    async renderList()
    {
        this.$listContainer.empty();

        if (this.list_type === 'teams')
        {
            let teams = await this.storage.get_all_teams();
            
            if (teams == 'err')
            {
                this.$errorContainer.empty();

                this.errorTemplateHtml =  this.getTemplateHtml('./templates/error_template.ejs');
                this.$errorContainer.html(ejs.render(this.errorTemplateHtml));
            }

            else
            {
                this.listTemplateHtml =  this.getTemplateHtml('./templates/all_teams.ejs');
                let html = await ejs.render(this.listTemplateHtml, {teams_data: teams, storage: this.storage}, {async: true});
                this.$listContainer.html(html);
                this.bindListEvents();
            }
        }
        else
        {
            let owners = await this.storage.get_all_owners();
            
            if (owners == 'err')
            {
                this.$errorContainer.empty();

                this.errorTemplateHtml =  this.getTemplateHtml('./templates/error_template.ejs');
                this.$errorContainer.html(ejs.render(this.errorTemplateHtml));
            }

            else
            {
                this.listTemplateHtml =  this.getTemplateHtml('./templates/all_owners.ejs');
                let html = await ejs.render(this.listTemplateHtml, {owners_data: owners, storage: this.storage}, {async: true});
                this.$listContainer.html(html);
                this.bindListEvents();
            }
        }
        // $('#view-display').scrollView();
    }

    async renderForm(id)
    {
        
        this.$appContainer.empty();
        this.$listContainer.empty();
        this.$formContainer.empty();
        this.$errorContainer.empty();

        if (this.list_type === 'teams') {
            let team; 
            let new_team = false;
            let form_title;
            let form_id;
            if (!id) {
                form_title = 'Create New Team';
                form_id = 'newTeamForm'
                new_team = true;
                team = {
                    name: "",
                    notes: "",
                    owner_id: 1,
                    league_id: 1
                }
            }
            else {
                team = await this.storage.get_one_team(id);
                form_title = `Edit ${team.name}`;
                form_id = 'editTeamForm';
            }

            this.formTemplateHtml = this.getTemplateHtml('./templates/form.ejs');
            
            let html = await ejs.render(this.formTemplateHtml, {form_title: form_title, form_id: form_id, data: team, model: teamModel, storage: this.storage}, {async: true});
            this.$formContainer.html(html);

            let valSvc = new formService(teamModel, form_id);
            this.bindFormEvents(new_team, id, form_id, valSvc, team);
        }

        else {
            let owner; 
            let new_owner = false;
            let form_title;
            let form_id;
            if (!id) {
                form_title = 'Create New Owner';
                form_id = 'newOwnerForm'
                new_owner = true;
                owner = {
                    first_name: "",
                    last_name: "",
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    zip: "",
                    email: "",
                    phone: "",
                    password: "",
                    user_name: ""
                }
            }
            else {
                owner = await this.storage.get_one_owner(id);
                form_title = `Edit ${owner.first_name} ${owner.last_name}`;
                form_id = 'editOwnerForm';
            }

            this.formTemplateHtml = this.getTemplateHtml('./templates/form.ejs');
            
            let html = await ejs.render(this.formTemplateHtml, {form_title: form_title, form_id: form_id, data: owner, model: ownerModel, storage: this.storage}, {async: true});
            this.$formContainer.html(html);

            let valSvc = new formService(ownerModel, form_id);
            this.bindFormEvents(new_owner, id, form_id, valSvc, owner);
        }
        // $('#view-display').scrollView();
    }

    bindAppEvents()
    {
        $("#resetView").off('click');
        $("#resetView").click(() => {
            this.reset();
        });

        $("#searchInput").off('input')
        $("#searchInput").on('input', () => {
            this.storage.filter_str = $("#searchInput").val();
            
            this.renderList()
        });

        $('#createNew').off('click');
        $('#createNew').click(() => {
            if (this.list_type === 'teams') {
                this.render('form', 'teams');
            }
            else this.render('form', 'owners');
        });

        $("#clearSearch").off('click');
        $("#clearSearch").click(() => {
            $("#searchInput").val('');
            this.storage.filter_str = '';
            this.renderList();
        });
    }

    async bindListEvents() 
    {
        // Delete and Edit Buttons
        if (this.list_type === 'teams')
        {
            let teams = await this.storage.get_all_teams();
            for (let team of teams)
            {
                let el = `#remove${team.id}`;
                $(el).off('click');
                $(el).click(async () => {
                    let confirm = window.confirm(`Are you sure you want to delete ${team.name}?`);
                    if (confirm){
                        let team_owner = await this.storage.get_one_owner(team.owner_id);
                        team_owner.team_id = 1;
                        await this.storage.edit_owner(team_owner, team_owner.id, false);
                        this.storage.delete_team(team.id);
                        this.render();
                    }
                });

                el = `#edit${team.id}`;
                $(el).off('click');
                $(el).click(() => {
                    this.render('form', 'teams', team.id);
                });
            }
        }
        else
        {
            let owners = await this.storage.get_all_owners();
            for (let owner of owners)
            {
                let el = `#remove${owner.id}`
                $(el).off('click');
                $(el).click(async () => {
                    let confirm = window.confirm(`Are you sure you want to delete ${owner.first_name} ${owner.last_name}?`);
                    if (confirm){
                        // Make it so that the owners team is owned by admin then delete
                        let owner_team = await this.storage.get_one_team(owner.team_id);
                        owner_team.owner_id = 1;
                        await this.storage.edit_team(owner_team, owner_team.id, false);
                        this.storage.delete_owner(owner.id);
                        this.render();
                    }
                });

                el = `#edit${owner.id}`;
                $(el).off('click');
                $(el).click(() => {
                    this.render('form', 'owners', owner.id);
                });
            }
        }

        let that = this;
        $('.sortable').off('click');
        $('.sortable').each(function() {
            let title = this;
            if (title.attributes['data-name'].nodeValue == 'team_id') {
                $(title).addClass('not-clickable');
                    return;
            }
            $(title).on('click', function() {
                let columnName = this.attributes['data-name'].nodeValue;
                if (that.storage.sort_col == columnName) {
                    if (that.storage.sort_dir == 'asc') {
                        that.storage.sort_dir = 'desc';
                    } else {
                        that.storage.sort_dir = 'asc';
                    }
                } else {
                    that.storage.sort_col = columnName;
                    that.storage.sort_dir = 'asc';
                }
                that.renderList();
            });
        });
    }

    bindFormEvents(_new, id, formId, valSvc, data)
    {
        $('#formReset').off('click');
        $('#formReset').click(() => {
            this.renderForm(id);
            $('#view-display').scrollView();
        });

        $(`#formSubmit`).click(async () => {
            let valid = await valSvc.validateForm();
            
            if (valid) {
                
                for (let field in data) {
                    // Special case checking for if team ownership was changed to teh edited/created owner
                    if (field == 'team_id') { // Only applies to owner edit/create submissions
                        if (data[field] != $(`#${field}`).val()) { // Check if new team is already owned
                            // Change old team to have no owner
                            let old_team = await this.storage.get_one_team(data[field]);
                            old_team.owner_id = 1;
                            await this.storage.edit_team(old_team, old_team.id, false);
                            
                            // Get the new team
                            let chosen_team = await this.storage.get_one_team($(`#${field}`).val());
                            if (chosen_team.owner_id != 1) { // If not currently owned by admin - means someone else owns it. Previous owner loses it.
                                let old_owner_id = chosen_team.owner_id;
                                let old_owner = await this.storage.get_one_owner(old_owner_id);
                                old_owner.team_id = 1;
                                await this.storage.edit_owner(old_owner, old_owner.id, false);
                            }
                            chosen_team.owner_id = id;
                            await this.storage.edit_team(chosen_team, chosen_team.id, false);
                        }
                    }
                    // Check if field has value, if it does then assign data to that value, if not keep it as it was
                    $(`#${field}`).val() ? data[field] = $(`#${field}`).val() : data[field] = data[field];
                }
                if (_new) {
                    if (this.list_type == 'teams') {
                        this.storage.create_team(data);
                    }
                    else {
                        console.log(data)
                        this.storage.create_owner(data);
                    }
                }
                else {
                    if (this.list_type == 'teams') {
                        this.storage.edit_team(data, id, true);
                    }
                    else {
                        this.storage.edit_owner(data, id, true);
                    }
                }
            }
        });
    }

    getTemplateHtml(url){
        let ret=null;
        $.ajax({
            dataType:"text",
            async:false,
            url:url,
            success:function(data){
                ret=data;
            }
        })
        return ret;
    }
}