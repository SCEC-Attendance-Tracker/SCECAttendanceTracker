class AttendanceControllerTest < ActionDispatch::IntegrationTest
	  test 'assert_react_component' do
		get "/attendances"
		assert_equal 200, response.status
	
		# assert rendered react component and check the props
		assert_react_component "AttendanceDataTable" do |props|
		  assert_instance_of Member, props[:members]
		end
	
		# or just assert component rendered
		assert_react_component "AttendanceDataTable"
	  end
	end