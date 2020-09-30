const appView = Vue.component('appview', {
    name: 'appView',
    data: function () {
        return {
            shared: globalState
        };
    },
    template: `
    <div>
        <template v-if="shared.camActive">
            <frameview>
                <sceneview />      
            </frameview>
        </template>
        <template v-else>
            <mapview />
        </template>
        <dashview class="dashboard"></dashview>
    </div>
`
});